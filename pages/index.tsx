import type { GetServerSideProps, NextPage } from 'next'
import App from '../components/App';
import { customFetch } from '../components/hooks/useFetch';
import { config } from '../config/config';

const Home: NextPage = () => {
    return (
        <div>
            <App />
        </div>
    );
};

export default Home

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const {data:user, error} = await customFetch(`${config.apiUrl}/user/get`, {
        headers: {
            cookie: req.headers.cookie || '',
        }
    })

    if(!user){
        return {
            redirect: {
                destination: '/login',
            },
            props: {
                user,
            }
        }
    }
    return {
        props: {user: null}
    }
}