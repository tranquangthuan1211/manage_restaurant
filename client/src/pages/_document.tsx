import { pad } from "lodash";
import Document, {Html, NextScript, Main, Head} from "next/document";


class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                </Head>
                <body
                    style={{
                    padding: 0,
                    margin: 0,
                    }}
                >
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;