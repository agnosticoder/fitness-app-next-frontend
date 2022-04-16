import { ComponentProps } from 'react';

const Button = ({ children, ...rest }: ComponentProps<'button'>) => {
    return <button className='bg-slate-500 hover:bg-slate-700 text-white font-semibold py-1 px-2 rounded' {...rest}>{children}</button>;
};

export default Button;
