import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../layouts/Layout';
import { ErrorMessageProvider } from '../components/store/errorMessageStore';
import { ErrorBoundary } from 'react-error-boundary';
import clientErrorHandler from '../lib/clientErrorHandler';
import ErrorFallbackComponent from '../components/ErrorFallbackComponent';
import { SelectedExercisesProvider } from '../components/store/selectedExercisesStore';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import GlobalLoader from '../components/GloabalLoader';
import NiceModal from '@ebay/nice-modal-react';
import ConfirmStartNewWorkout from '../components/modals/ConfirmStartNewWorkout';


const queryClient = new QueryClient();


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <ErrorBoundary FallbackComponent={ErrorFallbackComponent} onError={clientErrorHandler}>
                <QueryClientProvider client={queryClient}>
                    <NiceModal.Provider>
                        <GlobalLoader />
                        <ErrorMessageProvider init="">
                            <SelectedExercisesProvider init={[]}>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </SelectedExercisesProvider>
                        </ErrorMessageProvider>
                        <ReactQueryDevtools />
                    </NiceModal.Provider>
                </QueryClientProvider>
            </ErrorBoundary>
        </div>
    );
}

export default MyApp
