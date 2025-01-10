import ContentHeader from "src/sections/dashboard/content-header";
import { Layout } from "src/layouts/index"
import {Page as PageType} from "src/types/page";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ProfileSection from "src/sections/setting/profile-section"
import ChangePasswordDialog from "src/sections/setting/change-password-dialog"
import ChangePasswordSection from "src/sections/setting/change-password-section"
const Page:PageType = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Stack
                spacing={3}
                sx={{
                    my: 3,
                }}
                >
                    <Typography variant="h4">Thông tin tài khoản</Typography>
                    <ProfileSection />
                    <ChangePasswordSection />
                </Stack>
            </Container>
        </>
    )
}
Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page