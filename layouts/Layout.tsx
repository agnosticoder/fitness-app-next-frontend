import Head from 'next/head';
import ExercisesButton from '../components/ExercisesNavLink';
import HistoryButton from '../components/HistoryNavLInk';
import NotificationPortal from '../components/NotificationPortal';
import StartWorkoutNavLink from '../components/StartWorkoutNavLink';

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="text-zinc-200 bg-zinc-800   min-h-screen">
            <Head>
                <title>Fitness Resort</title>

                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="viewport" content="initial-scale=1, viewport-fit=cover, user-scalable=no" />

                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            {/* Header */}
            <div className="h-14"></div>
            <header className="standalone:h-[88px] fixed flex justify-center items-end top-0 left-0 right-0 h-14 text-center bg-zinc-700 z-10 border-b-[1px] border-rose-400/30">
                <span className="flex justify-center items-center font-extrabold text-2xl text-rose-500">
                    Fitness Resort
                </span>
            </header>

            <div className="fixed bottom-0 left-0 right-0 z-10 h-20 pb-8 pt-2 bg-zinc-700 drop-shadow-lg">
                <div className='flex justify-evenly text-center'>
                    <HistoryButton />
                    <StartWorkoutNavLink />
                    <ExercisesButton />
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-4 sm:mx-16 pt-4 pb-1 lg:mx-52 standalone:pt-[50px]">
                <main>{children}</main>
            </div>
            {/* //Todo: Remove this if not needed */}
            {/* {message && <ErrorMessagePortal>{message}</ErrorMessagePortal>} */}
            <NotificationPortal />
        </div>
    );
};

export default Layout;
