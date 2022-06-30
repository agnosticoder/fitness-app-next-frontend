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
        <div className="text-cyan-900 bg-slate-200 min-h-screen">
            <Head>
                <title>Fitness Resort</title>
            </Head>
            {/* Header */}
            <div className="bg-slate-500 text-slate-200 px-16 py-4">
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
            </div>

            {/* Main Content */}
            <div className="mx-4 sm:mx-16 pt-4 pb-1">
                <main>{children}</main>
            </div>
            {message && <ErrorMessagePortal>{message}</ErrorMessagePortal>}
        </div>
    );
};

export default Layout;
