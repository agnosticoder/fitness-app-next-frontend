import { GetServerSideProps } from 'next';
import HistoryWorkouts from "../../components/HistoryWorkouts";
import { customFetch } from '../../components/hooks/useFetch';
import { config } from '../../config/config';

const History = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8">History</h1>
            <HistoryWorkouts />
        </div>
    );
};

export default History;

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