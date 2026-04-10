type CardDateSpecialType = {
  type: 'reunion' | 'holiday' | 'no_class' | 'tour';
};


export const typeConfig: Record<
  CardDateSpecialType['type'],
  { bg: string; border: string; label: string }
> = {
  tour:     { bg: '#dbeeff', border: '#7ec8f5', label: 'Passeio'   },
  no_class: { bg: '#ffe8e3', border: '#f5a898', label: 'Sem Aula'  },
  reunion:  { bg: '#fef3d6', border: '#f5d07a', label: 'Reunião'   },
  holiday:  { bg: '#e8f5d6', border: '#a8d96e', label: 'Feriado'   },
};