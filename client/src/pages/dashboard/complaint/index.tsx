import { Layout } from "src/layouts/index"
import {Page as PageType} from "src/types/page";
import ContentHeader from "src/sections/dashboard/content-header";
import { Box, Button, Stack } from "@mui/material";

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
                            // startIcon={<UploadFileIcon  />}
                            >
                            Import danh sách TK Nhân viên
                        </Button>
        
                        <Button
                            variant="contained"
                            color="primary"
                            // startIcon={<AddIcon />}
                            // onClick={() => {
                            //     addDrawer.handleOpen();
                            // }}
                        >
                        Thêm tài khoản Nhân viên
                        </Button>
                    </>
                    }
                    </Box>
                }
        />

        </Stack>
    )
}
Page.getLayout = (page) => <Layout >{page}</Layout>

export default Page;