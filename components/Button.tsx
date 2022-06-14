import { ComponentProps } from 'react';

const Button = ({ children, className: _className, ...rest }: ComponentProps<'button'>) => {
    return <button className={`bg-slate-500 hover:bg-slate-700 text-white font-semibold py-1 px-2 rounded ${_className}`} {...rest}>{children}</button>;
};

export default Button;
