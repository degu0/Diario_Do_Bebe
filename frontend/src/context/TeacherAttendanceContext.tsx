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

function getReportStatusForAttendance(
  previousReportStatus: TeacherChild['reportStatus'],
  attendance: Exclude<TeacherAttendanceStatus, 'unmarked'>,
): TeacherChild['reportStatus'] {
  if (attendance === 'absent') {
    return 'Ausente';
  }

  return previousReportStatus === 'Ausente' ? 'Pendente' : previousReportStatus;
}

export function TeacherAttendanceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [classChildren, setClassChildren] = useState<TeacherChild[]>([]);

  const refreshChildren = useCallback(async () => {
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
    const bebes = await listBebesByTurma(turmaId).catch(() => []);
    const mappedChildren = await Promise.all(
      bebes.map(async (bebe) => {
        const diarios = await listDiariosByBebe(bebe.id, hoje).catch(() => []);
        return mapTeacherChild(bebe, diarios[0] ?? null);
      }),
    );

    setClassChildren(mappedChildren);
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (user?.type !== 'teacher') {
        if (isMounted) setClassChildren([]);
        return;
      }

      const turmaId = user.turmas?.[0]?.id;
      if (!turmaId) {
        if (isMounted) setClassChildren([]);
        return;
      }

      const hoje = new Date().toISOString().split('T')[0];
      const bebes = await listBebesByTurma(turmaId).catch(() => []);
      const mappedChildren = await Promise.all(
        bebes.map(async (bebe) => {
          const diarios = await listDiariosByBebe(bebe.id, hoje).catch(() => []);
          return mapTeacherChild(bebe, diarios[0] ?? null);
        }),
      );

      if (isMounted) {
        setClassChildren(mappedChildren);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const markAttendance = async (
    childId: string,
    attendance: Exclude<TeacherAttendanceStatus, 'unmarked'>,
  ) => {
    if (!user || user.type !== 'teacher') return;

    await registerPresence({
      bebeId: Number(childId),
      adiId: user.id,
      presenca: attendance === 'absent' ? 'ausente' : 'presente',
    });

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
