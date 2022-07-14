import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../layouts/Layout';
import { ErrorBoundary } from 'react-error-boundary';
import clientErrorHandler from '../lib/clientErrorHandler';
import ErrorFallbackComponent from '../components/ErrorFallbackComponent';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import GlobalLoader from '../components/GloabalLoader';
import NiceModal from '@ebay/nice-modal-react';
import '../components/modals/modals';


const queryClient = new QueryClient();


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div style={{ WebkitTapHighlightColor: 'transparent' }}>
            <ErrorBoundary FallbackComponent={ErrorFallbackComponent} onError={clientErrorHandler}>
                <QueryClientProvider client={queryClient}>
                    <NiceModal.Provider>
                        {/* <GlobalLoader /> */}
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                        <ReactQueryDevtools />
                    </NiceModal.Provider>
                </QueryClientProvider>
            </ErrorBoundary>
        </div>
    );
}

export default MyApp
