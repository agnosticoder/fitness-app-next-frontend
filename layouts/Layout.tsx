import { useAtom } from 'jotai';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import ErrorMessagePortal from '../components/ErrorMessagePortal';
import useErrorMessage from '../components/hooks/useErrorMessage';
import { messageAtom } from '../components/store/atoms';

const Layout: FC = ({ children }) => {
    const [message] = useAtom(messageAtom);

    return (
        <div className="text-rose-100 bg-zinc-800   min-h-screen">

            <Head>
                <title>Fitness Resort</title>

                <meta 
                name='apple-mobile-web-app-status-bar-style'
                content='black-translucent'
                />
                <meta name='viewport' content='initial-scale=1, viewport-fit=cover, user-scalable=no' />

                <link rel='manifest' href='/site.webmanifest'/>
            </Head>

            {/* Header */}
            <div className="h-14"></div>
                <header className="standalone:h-[88px] fixed flex justify-center items-end top-0 left-0 right-0 h-14 text-center bg-zinc-700 z-10 border-b-[1px] border-rose-400/30">
                    <span className="flex justify-center items-center font-extrabold text-2xl text-rose-500">
                        Fitness Resort
                    </span>
                </header>

            {/* <div className="bg-slate-500 text-slate-200 px-16 py-4">
                <div>
                    <h1 className="text-3xl font-bold">Fitness Resort</h1>
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/history">
                                <a className="nav-link">History</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="mx-4 sm:mx-16 pt-4 pb-1 lg:mx-52 standalone:pt-[50px]">
                <main>{children}</main>
            </div>
            {message && <ErrorMessagePortal>{message}</ErrorMessagePortal>}
        </div>
    );
};

export default Layout;
