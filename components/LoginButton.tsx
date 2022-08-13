import Link from "next/link";
import { useRouter } from "next/router";
import { RiLoginBoxFill } from 'react-icons/ri';

const LoginButton = () => {
    const router = useRouter();
    const active = router.pathname === "/login";

    return (
        <Link href="/login">
            <a className={`${active ? "text-zinc-200" : "text-zinc-200/50"}`}>
                <RiLoginBoxFill size={25} className="mx-auto h-6"/>
                <span className="text-xs">Login</span>
            </a>
        </Link>
    );
};

export default LoginButton;
