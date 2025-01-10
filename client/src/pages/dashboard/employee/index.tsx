import { use, useEffect, useMemo } from 'react';
import ContentHeader from 'src/sections/dashboard/content-header';
import { Layout } from "src/layouts/index"
import {Page as PageType} from "src/types/page";
import { Box, Button, Stack } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import {EmployeeTable} from "src/sections/employee/table-employee"; 
import EmployeeProvider from "src/contexts/employee/employee-context";
import { useEmployee } from 'src/contexts/employee/employee-context';
import EmployeeDrawerAdd from "src/sections/employee/drawer-add-employee";
import { useDrawer } from 'src/hooks/use-drawer';
const Page:PageType = () => {
    const {getEmployee} = useEmployee();
    const employees = useMemo(() => getEmployee.data?.data || [], [getEmployee.data]);
    useEffect(() => {
      console.log(employees)
    },[employees])
    const addDrawer = useDrawer();
    return (
        <Stack>
            <ContentHeader 
                title="Employee" 
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
                    {
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<UploadFileIcon  />}
                        >
                          Import danh sách TK Nhân viên
                        </Button>
        
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={() => {
                            addDrawer.handleOpen();
                          }}
                        >
                          Thêm tài khoản Nhân viên
                        </Button>
                      </>
                    }
                    </Box>
                  }
            />
            <EmployeeTable
                employees={employees}
            />
            <EmployeeDrawerAdd
                open={addDrawer.open}
                onClose={addDrawer.handleClose}
              />

        </Stack>
    )
}
Page.getLayout = (page) => 
<Layout>
  <EmployeeProvider>
    {page}
  </EmployeeProvider>
</Layout>

export default Page