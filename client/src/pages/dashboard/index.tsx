import { useMemo } from "react";
import {type Page as PageType} from "src/types/page";
import { Layout } from "src/layouts/index";
import { Box, Button, Stack, Typography } from "@mui/material";

const Page: PageType = () => {

    return (
        <Stack spacing = {2}>
            <h1>jdjdjdj</h1>
        </Stack>
    )
}
Page.getLayout = (page) => 
<Layout>
    {page}
</Layout>
export default Page;