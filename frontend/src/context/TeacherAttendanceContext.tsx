import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';
import { listBebesByTurma } from '@/services/bebeService';
import { listDiariosByBebe, registerPresence } from '@/services/diarioService';
import { mapTeacherChild } from '@/services/mappers';
import type { TeacherAttendanceStatus, TeacherChild } from '@/types/teacherChild';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type TeacherAttendanceContextValue = {
  children: TeacherChild[];
  markAttendance: (
    childId: string,
    attendance: Exclude<TeacherAttendanceStatus, 'unmarked'>,
  ) => Promise<void>;
  getChildById: (childId: string) => TeacherChild | null;
  refreshChildren: () => Promise<void>;
};

const TeacherAttendanceContext = createContext<TeacherAttendanceContextValue | undefined>(
  undefined,
);

// Chave do AsyncStorage varia por dia — ontem não interfere
function attendanceStorageKey() {
  const hoje = new Date().toISOString().split('T')[0];
  return `@diario_bebe:attendance:${hoje}`;
}

async function loadLocalAttendance(): Promise<Record<string, Exclude<TeacherAttendanceStatus, 'unmarked'>>> {
  try {
    const raw = await AsyncStorage.getItem(attendanceStorageKey());
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function saveLocalAttendance(
  record: Record<string, Exclude<TeacherAttendanceStatus, 'unmarked'>>,
) {
  try {
    await AsyncStorage.setItem(attendanceStorageKey(), JSON.stringify(record));
  } catch {
    /* silencia — o estado em memória ainda funciona */
  }
}

function getReportStatusForAttendance(
  previousReportStatus: TeacherChild['reportStatus'],
  attendance: Exclude<TeacherAttendanceStatus, 'unmarked'>,
): TeacherChild['reportStatus'] {
  if (attendance === 'absent') return 'Ausente';
  return previousReportStatus === 'Ausente' ? 'Pendente' : previousReportStatus;
}

export function TeacherAttendanceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [classChildren, setClassChildren] = useState<TeacherChild[]>([]);

  const buildChildren = useCallback(async () => {
    if (user?.type !== 'teacher') {
      setClassChildren([]);
      return;
    }

    const turmaId = user.turmas?.[0]?.id;
    if (!turmaId) {
      setClassChildren([]);
      return;
    }

    const hoje = new Date().toISOString().split('T')[0];

    // Busca diários da API (para reportStatus) e attendance local em paralelo
    const [bebes, localAttendance] = await Promise.all([
      listBebesByTurma(turmaId).catch(() => []),
      loadLocalAttendance(),
    ]);

    const mappedChildren = await Promise.all(
      bebes.map(async (bebe) => {
        const diarios = await listDiariosByBebe(bebe.id, hoje).catch(() => []);
        const child = mapTeacherChild(bebe, diarios[0] ?? null);

        // Attendance local tem prioridade sobre o que veio da API
        const savedAttendance = localAttendance[String(bebe.id)];
        if (savedAttendance) {
          return {
            ...child,
            attendance: savedAttendance,
            reportStatus: getReportStatusForAttendance(child.reportStatus, savedAttendance),
          };
        }

        return child;
      }),
    );

    setClassChildren(mappedChildren);
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    buildChildren().then(() => {
      if (!isMounted) return;
    });

    return () => {
      isMounted = false;
    };
  }, [user]);

  const refreshChildren = useCallback(async () => {
    await buildChildren();
  }, [buildChildren]);

  const markAttendance = async (
    childId: string,
    attendance: Exclude<TeacherAttendanceStatus, 'unmarked'>,
  ) => {
    if (!user || user.type !== 'teacher') return;

    // 1. Salva no backend
    await registerPresence({
      bebeId: Number(childId),
      adiId: user.id,
      presenca: attendance === 'absent' ? 'ausente' : 'presente',
    });

    // 2. Persiste localmente no AsyncStorage
    const current = await loadLocalAttendance();
    current[childId] = attendance;
    await saveLocalAttendance(current);

    // 3. Atualiza estado em memória imediatamente
    setClassChildren((currentChildren) =>
      currentChildren.map((child) =>
        child.id === childId
          ? {
              ...child,
              attendance,
              reportStatus: getReportStatusForAttendance(child.reportStatus, attendance),
            }
          : child,
      ),
    );
  };

  const value = useMemo<TeacherAttendanceContextValue>(
    () => ({
      children: classChildren,
      markAttendance,
      getChildById: (childId: string) =>
        classChildren.find((child) => child.id === childId) ?? null,
      refreshChildren,
    }),
    [classChildren, refreshChildren],
  );

  return (
    <TeacherAttendanceContext.Provider value={value}>{children}</TeacherAttendanceContext.Provider>
  );
}

export function useTeacherAttendance() {
  const context = useContext(TeacherAttendanceContext);

  if (!context) {
    throw new Error('useTeacherAttendance must be used within TeacherAttendanceProvider');
  }

  return context;
}
