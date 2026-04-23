export type TeacherAttendanceStatus = 'unmarked' | 'present' | 'absent';

export type TeacherReportStatus = 'Preenchida' | 'Pendente' | 'Ausente';

export type TeacherChild = {
  id: string;
  name: string;
  className: string;
  attendance: TeacherAttendanceStatus;
  reportStatus: TeacherReportStatus;
};
