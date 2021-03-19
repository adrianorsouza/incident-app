export const columns = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Título' },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Descrição',
  },
  { id: 'level', numeric: false, disablePadding: false, label: 'Criticidade' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Tipo' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  {
    id: 'data',
    numeric: false,
    disablePadding: false,
    label: 'Data',
    sort: false,
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Ação',
    sort: false,
  },
];
