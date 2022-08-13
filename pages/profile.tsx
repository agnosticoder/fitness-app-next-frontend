import { GetServerSideProps } from 'next';
import { customFetch } from '../components/hooks/useFetch';
import useLogout from '../components/hooks/useLogout';
import { config } from '../config/config';

const Profile = () => {
    const {mutate} = useLogout();

    const onLogout = async () => {
        mutate();
    }

    return (
        <div>
            <button className='inline-block bg-rose-200/70 text-rose-600 py-1 px-2 text-sm font-bold rounded-md border-[1px] border-rose-300/70' onClick={onLogout}>Log out</button>
        </div>
    );
}

export default Profile;

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