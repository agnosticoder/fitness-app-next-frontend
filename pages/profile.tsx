import { GetServerSideProps } from 'next';
import { CgProfile } from 'react-icons/cg';
import { customFetch } from '../components/hooks/useFetch';
import useGetUser from '../components/hooks/useGetUser';
import useLogout from '../components/hooks/useLogout';
import { config } from '../config/config';

const Profile = () => {
    const { data: user } = useGetUser();
    const { mutate } = useLogout();
    const onLogout = async () => {
        mutate();
    };

    return (
        <div>
            <div className='bg-zinc-700 p-4 rounded-3xl mt-4'>
                <div className="mt-6">
                    <span>
                        <CgProfile className="mx-auto" size={100} />
                    </span>
                </div>
                <div className="text-center mt-6">
                    <span className='text-xl text-rose-400'>{user?.name}</span>
                </div>
                <div className="text-center mt-6">
                    <span className='text-sm text-rose-400'>{user?.email}</span>
                </div>
            </div>
            <div className="mt-28 text-center">
                <button
                    className="inline-block bg-rose-200/70 text-rose-600 py-1 px-2 text-sm font-bold rounded-md border-[1px] border-rose-300/70"
                    onClick={onLogout}
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

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