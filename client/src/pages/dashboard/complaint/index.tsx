import { Layout } from "src/layouts/index"
import {Page as PageType} from "src/types/page";
import ContentHeader from "src/sections/dashboard/content-header";
import { Box, Button, Stack } from "@mui/material";
import {ComplaintTable} from "src/sections/complaint/table-complaint"
import ComplaintProvider, {useComplaint} from "src/contexts/complaint/complaint-context";
import { useMemo,useEffect } from "react";
import { get } from "lodash";

const Page:PageType = () => {
    const {getComplaints} = useComplaint();
    const complaints = useMemo(() => {
        return getComplaints.data?.data || [];
    },[getComplaints.data]);
    useEffect(() => {
        console.log(complaints);
    },[complaints]);
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
            <ComplaintTable
                complaints={complaints}
            />
        </Stack>
    )
}
Page.getLayout = (page) => 
<Layout >
    <ComplaintProvider>
        {page}
    </ComplaintProvider>
</Layout>

export default Page;