import React, { useState, useMemo, use, useEffect } from "react"
import {Page as PageType} from "src/types/page"
import { Layout } from "src/layouts/index"
import ContentHeader from 'src/sections/dashboard/content-header';
import { Stack, Box, Button, Tabs, Tab, useMediaQuery, Theme } from '@mui/material';
import ProductPage from 'src/sections/staff-menu';
const Page:PageType = () => {
    return (
        <Stack spacing={2}>
            <ContentHeader 
                title="Menu nhà hàng" 
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
            <ProductPage/>
        </Stack>
    )
}

Page.getLayout = (page) => 
<Layout>
    {page}
</Layout>

export default Page;