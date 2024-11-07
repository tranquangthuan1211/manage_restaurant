import {Page as PageType} from "src/types/page"
import {Layout} from "src/layouts/index"
import Paypal from "src/components/paypal"


const Page:PageType = () => {
    return (
        <Paypal 
            amount={10}
            recipientEmail= {"sb-64jjv33846136@personal.example.com"}
        />
    )
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page