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
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../components/LoadingSpinner';

const queryClient = new QueryClient();

const Loading = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => (setIsLoading(true));
        const handleComplete = () => (setIsLoading(false));
        
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }

    }, [router]);

    return isLoading ? <div className='text-zinc-200 h-screen w-screen flex justify-center items-center'>Loading...</div> : null;
};


function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <motion.div
        key={router.route}
        initial="initial"
        animate="pageAnimate"
        variants={{
            initial: {
                opacity: 0,
            },
            pageAnimate: {
                opacity: 1,
            }
        }}
        >
            <Loading />
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
        </motion.div>
    );
}

export default MyApp
