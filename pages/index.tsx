import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import App from '../components/App';
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <App />
        </div>
    );
};

export default Home
