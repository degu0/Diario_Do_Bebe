export type TeacherAttendanceStatus = 'unmarked' | 'present' | 'absent';

export type TeacherReportStatus = 'Preenchida' | 'Pendente' | 'Ausente';

export const DIARY_STATUS = {
  AUSENTE: 'Ausente',
  PENDENTE: 'Pendente',
  PREENCHIDA: 'Preenchida',
} as const;

export type TeacherChild = {
  id: string;
  name: string;
  className: string;
  attendance: TeacherAttendanceStatus;
  reportStatus: TeacherReportStatus;
};
