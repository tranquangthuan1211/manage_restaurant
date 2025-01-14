import React, { useState, useMemo, useEffect } from "react";
import { Page as PageType } from "src/types/page";
import { Layout } from "src/layouts/index";
import ContentHeader from 'src/sections/dashboard/content-header';
import { Stack, Box, Button, Drawer } from '@mui/material';
import LeaveProvider, { useLeave } from "src/contexts/leave/leave-context";
import { EmployeeLeaveHistory } from "src/sections/staff/table-employee-leave";
import LeavePanel from 'src/sections/leave/leave-panel';

const Page: PageType = () => {
  const { getLeave } = useLeave();
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const leaves = useMemo(() => {
    return getLeave.data?.data || [];
  }, [getLeave.data]);

  useEffect(() => {
    if (getLeave.data) {
      setLoading(false);
    }
  }, [getLeave.data]);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Stack spacing={2}>
      <ContentHeader 
        title="Employee Leave History" 
        rightSection={
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              height: "40px",
              padding: "0 16px",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleDrawerOpen}>
              Create Leave Request
            </Button>
          </Box>
        }
      />
      <EmployeeLeaveHistory leaves={leaves} />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <LeavePanel onClose={handleDrawerClose} />
      </Drawer>
    </Stack>
  );
};

Page.getLayout = (page) => 
  <Layout>
    <LeaveProvider>
      {page}
    </LeaveProvider>
  </Layout>;

export default Page;