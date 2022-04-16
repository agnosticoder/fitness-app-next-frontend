import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../layouts/Layout';
import {ErrorMessageProvider} from '../components/store/errorMessageStore';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <ErrorMessageProvider init=''>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ErrorMessageProvider>
        </div>
    );
}

export default MyApp
