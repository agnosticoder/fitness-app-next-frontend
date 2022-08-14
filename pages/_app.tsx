import '../styles/main.css'
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
import Nprogress from 'nprogress';

const queryClient = new QueryClient();

const useLoading = () => {
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => Nprogress.start();
        const handleComplete = () => Nprogress.done();
        
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }

    }, [router]);
};


function MyApp({ Component, pageProps, router }: AppProps) {
    useLoading();
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
                transition: {
                    duration: 0.3,
                }
            }
        }}
        >
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
