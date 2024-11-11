import ContentHeader from 'src/sections/dashboard/content-header';
import { Layout } from "src/layouts/index"
import {Page as PageType} from "src/types/page";
import { Box, Button, Stack } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import {EmployeeTable} from "src/sections/employee/table-employee"; 

const Page:PageType = () => {
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
                          Import danh sách TK
                        </Button>
        
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={() => {
                            // editDrawer.handleOpen();
                          }}
                        >
                          Thêm tài khoản
                        </Button>
                      </>
                    }
                    </Box>
                  }
            />
            <EmployeeTable/>
        </Stack>
    )
}
Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page