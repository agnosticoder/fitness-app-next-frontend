import Head from 'next/head';
import { useEffect } from 'react';
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
                <link rel="icon" type="image/png" sizes="196x196" href="/favicon-196.png" />
                <link rel="apple-touch-icon" href="/apple-icon-180.png" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2048-2732.jpg"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2732-2048.jpg"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1668-2388.jpg"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2388-1668.jpg"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1536-2048.jpg"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2048-1536.jpg"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1668-2224.jpg"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2224-1668.jpg"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1620-2160.jpg"
                    media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2160-1620.jpg"
                    media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1284-2778.jpg"
                    media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2778-1284.jpg"
                    media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1170-2532.jpg"
                    media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2532-1170.jpg"
                    media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1125-2436.jpg"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2436-1125.jpg"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1242-2688.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2688-1242.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-828-1792.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1792-828.jpg"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1242-2208.jpg"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-2208-1242.jpg"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-750-1334.jpg"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1334-750.jpg"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-640-1136.jpg"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-splash-1136-640.jpg"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
            </Head>

            {/* Header */}
            <div className="h-14"></div>
            <header className="standalone:h-[88px] fixed flex justify-center items-end top-0 left-0 right-0 h-14 text-center bg-zinc-700 z-10 border-b-[1px] border-rose-400/30">
                <span className="flex justify-center items-center font-extrabold text-2xl text-rose-500">
                    Fitness Resort
                </span>
            </header>

            {/* Main Content */}
            <div className="mx-4 sm:mx-16 pt-4 pb-1 lg:mx-52 standalone:pt-[50px]">
                <main>{children}</main>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-10 h-20 pb-8 pt-2 bg-zinc-700 drop-shadow-lg">
                <div className="flex justify-evenly text-center">
                    <HistoryButton />
                    <StartWorkoutNavLink />
                    <ExercisesButton />
                </div>
            </div>
            {/* //Todo: Remove this if not needed */}
            {/* {message && <ErrorMessagePortal>{message}</ErrorMessagePortal>} */}
            <NotificationPortal />
        </div>
    );
};

export default Layout;
