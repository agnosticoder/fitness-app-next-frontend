import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'

const MyDocument = () => {

    return (
        <Html lang="en" className='bg-zinc-800'>
            <Head />
            <body className='bg-zinc-800'>
                <Main />
                <NextScript />
                <div id='error-message'></div>
            </body>
        </Html>
    );
};
export default MyDocument;