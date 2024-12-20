import React, { useState, useMemo, use, useEffect } from "react"
import {Page as PageType} from "src/types/page"
import { Layout } from "src/layouts/index"
import ContentHeader from 'src/sections/dashboard/content-header';
import { Stack, Box, Button, Tabs, Tab } from '@mui/material';
import {AppointmentTable} from "src/sections/appointment/table-appointment"
const Page:PageType = () => {
    return (
        <Stack spacing={2}>
            <ContentHeader 
                title="Danh sách phục vụ" 
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
            <AppointmentTable />
        </Stack>
    )
}

Page.getLayout = (page) => 
<Layout>
    {page}
</Layout>

export default Page;