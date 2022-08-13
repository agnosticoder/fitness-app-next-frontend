import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { customFetch } from '../components/hooks/useFetch';
import useSignup from '../components/hooks/useSignup';
import { config } from '../config/config';

type SignupInputs = {
    name: string;
    email: string;
    password: string;
};


const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInputs>();
    const router = useRouter();
    //Todo: Find out better way to show errors
    const { mutate, data } = useSignup();

    const onSignup = ({ name, email, password }: SignupInputs) => {
        mutate({ name, email, password });
    };

    // function return true if password contains at least one number, one letter(both upper and lowercase), one special character and is at least 8 characters long
    //Todo: implement this function later
    const validatePassword = (value: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(value);
    };

    return (
        <div className="h-full flex justify-center items-center mt-20">
            <div className="w-96 mx-auto bg-zinc-700 text-zinc-800 p-4 rounded-lg drop-shadow">
                <h1 className="text-xl text-zinc-200 font-bold text-center mb-6">Sign up</h1>
                <form onSubmit={handleSubmit(onSignup)}>
                    <div className="mb-6 relative">
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Name"
                            className="w-full p-2 rounded placeholder:text-zinc-400/50"
                        />
                        {errors.name && (
                            <span className="absolute -bottom-5 left-0 text-red-500 text-sm">Required</span>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <input
                            {...register('email', {
                                required: { value: true, message: 'Required' },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid Email',
                                },
                            })}
                            type="text"
                            placeholder="Email"
                            className="w-full p-2 rounded placeholder:text-zinc-400/50"
                        />
                        {errors.email && (
                            <span className="absolute -bottom-5 left-0 text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <input
                            {...register('password', {
                                required: { value: true, message: 'Required' },
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            })}
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 rounded placeholder:text-zinc-400/50"
                        />
                        {errors.password && (
                            <span className="absolute -bottom-5 left-0 text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-rose-600 p-2 hover:bg-rose-800 rounded text-zinc-100 mb-4 drop-shadow"
                    >
                        Sign Up
                    </button>
                    
                    {/* Errors */}
                    {data?.error ? (
                        <div className="text-center text-sm">
                            <span className="text-zinc-200 inline-block mr-2">{data.error}</span>
                            <Link href="/login">
                                <a className="text-rose-500 hover:underline inline-block">Login</a>
                            </Link>
                        </div>
                    ) : (
                        <div className="text-zinc-200 text-center text-sm">
                            Already have an account?
                            <Link href="/login">
                                <a className="text-rose-500 hover:underline inline-block ml-2">Login</a>
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Signup;

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const {data:user, error} = await customFetch(`${config.apiUrl}/user/get`, {
        headers: {
            cookie: req.headers.cookie || '',
        }
    })

    if(user){
        return {
            redirect: {
                destination: '/',
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