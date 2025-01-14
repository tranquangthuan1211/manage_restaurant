import React, { useMemo } from 'react';
import { CustomTable } from 'src/components/custom-table';
import { getEmployeeLeaveConfig } from './table-config-employee-leave';
import usePagination from 'src/hooks/use-pagination';
import { TablePagination } from '@mui/material';
import { Leave } from 'src/types/leave';
import { useUser } from 'src/contexts/users/user-context';

export const EmployeeLeaveHistory: React.FC<{ leaves: Leave[] }> = ({ leaves }) => {
  const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
  if (user === null || !isAuthenticated) {
    window.location.href = '/auth';
    return <div></div>;
  }

  const userLeaves = useMemo(() => leaves.filter(leave => leave.employeeId === user?.id), [leaves, user]);
  const pagination = usePagination({ count: userLeaves.length, base1Index : true });

  const configs = getEmployeeLeaveConfig();

  return (
    <>
      <CustomTable
        configs={configs}
        rows={userLeaves}
        pagination={pagination}
      />
    </>
  );
};