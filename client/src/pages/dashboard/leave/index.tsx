import React, { useState, useMemo, use, useEffect } from "react"
import {Page as PageType} from "src/types/page"
import { Layout } from "src/layouts/index"
import ContentHeader from 'src/sections/dashboard/content-header';
import { Stack, Box, Button, Tabs, Tab } from '@mui/material';
import DocViewer from "src/components/doc-view"
import LeaveProvider, {useLeave} from "src/contexts/leave/leave-context"
import { LeaveTable} from "src/sections/leave/table-leave"
const Page:PageType = () => {
    const fileUrl = "/docs/cancel-request.docx"
    const {getLeave} = useLeave();
    const leaves = useMemo(() => {
        return getLeave.data?.data || []
    }, [getLeave.data])
    useEffect(() => {
        console.log(leaves)
    }, [getLeave.data])
    return (
        <Stack spacing={2}>
            <ContentHeader 
                title="Lịch nghỉ ốm của nhân viên" 
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

                    </Box>
                  }
            />
            <LeaveTable leaves={leaves} />
            {/* <div>
                <DocViewer
                    fileUrl="/docs/example.docx"
                    onContentTransform={(content) =>
                        content
                        .replace(/{{name}}/g, "Nguyễn Văn B")
                        .replace(/{{date}}/g, "13/12/2024")
                        .replace(/{{date_quantity}}/g, "1")
                        .replace(/{{description}}/g, "Đi khám bệnh")
                    }
                    style={{ width: '100%', maxWidth: 800 }}
                />
            </div> */}
        </Stack>
    )
}

Page.getLayout = (page) => 
<Layout>
    <LeaveProvider>
        {page}
    </LeaveProvider>
</Layout>

export default Page;