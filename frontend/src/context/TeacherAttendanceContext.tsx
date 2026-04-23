import { teacherChildren } from '@/constants/TeacherChildren';
import type { TeacherAttendanceStatus, TeacherChild } from '@/types/teacherChild';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type TeacherAttendanceContextValue = {
  children: TeacherChild[];
  markAttendance: (
    childId: string,
    attendance: Exclude<TeacherAttendanceStatus, 'unmarked'>,
  ) => Promise<void>;
  getChildById: (childId: string) => TeacherChild | null;
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
  const [classChildren, setClassChildren] = useState<TeacherChild[]>(teacherChildren);

  const markAttendance = async (
    childId: string,
    attendance: Exclude<TeacherAttendanceStatus, 'unmarked'>,
  ) => {
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

    // TODO: substituir por chamada real da API de presenca.
    await Promise.resolve();
  };

  const value = useMemo<TeacherAttendanceContextValue>(
    () => ({
      children: classChildren,
      markAttendance,
      getChildById: (childId: string) =>
        classChildren.find((child) => child.id === childId) ?? null,
    }),
    [classChildren],
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
