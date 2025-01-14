import { Typography } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import { Leave } from 'src/types/leave';
import { format } from 'date-fns';

export const getEmployeeLeaveConfig = (): CustomTableConfig<Leave["id"], Leave>[] => [
  {
    key: "from",
    headerLabel: "Start Date",
    type: "string",
    renderCell: (data) => (
      <Typography>{format(new Date(data.from), "dd/MM/yyyy")}</Typography>
    )
  },
  {
    key: "to",
    headerLabel: "End Date",
    type: "string",
    renderCell: (data) => (
      <Typography>{format(new Date(data.to), "dd/MM/yyyy")}</Typography>
    )
  },
  {
    key: "reason",
    headerLabel: "Reason",
    type: "string",
  },
  {
    key: "status",
    headerLabel: "Status",
    type: "string",
  }
];