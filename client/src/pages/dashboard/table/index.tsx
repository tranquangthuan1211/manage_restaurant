import {Page as PageType} from "src/types/page";
import { Layout } from "src/layouts/index"
import { Stack } from "@mui/material";
import ContentHeader from 'src/sections/dashboard/content-header';


const Page:PageType = () => {
    return (
        <Stack>
            <ContentHeader 
                title="Thiết lập đặt lịch"
            />

        </Stack>
    )
}
Page.getLayout = (page) => <Layout>{page}</Layout>
export default Page