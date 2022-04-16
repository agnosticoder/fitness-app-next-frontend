import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

const Layout: FC = ({ children }) => (
    <div className="text-cyan-900 bg-slate-200 min-h-screen">
        <Head>
            <title>Fit & Diet</title>
        </Head>
        {/* Header */}
        <div className="bg-slate-500 text-slate-200 px-16 py-4">
            <div>
                <h1 className='text-2xl text-indigo-200'>Fit and Deit</h1>
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/playground">
                            <a className="nav-link">Playground</a>
                        </Link>
                    </li> */}
                </ul>
            </div>
        </div>

        {/* Main Content */}
        <div className="mx-16 pt-4">
            <main>{children}</main>
        </div>
    </div>
);

export default Layout;
