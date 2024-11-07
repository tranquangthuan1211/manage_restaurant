import {Page as PageType} from "src/types/page"
import { Layout } from "src/layouts/index"


const Page:PageType = () => {
    return (
        <h1>hello</h1>
    )
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page;