import Link from "next/link";
import { useRouter } from "next/router";
import { MdAccountBox } from 'react-icons/md';

const SignupButton = () => {
    const router = useRouter();
    const active = router.pathname === "/signup";

    return (
        <Link href="/signup">
            <a className={`${active ? "text-zinc-200" : "text-zinc-200/50"}`}>
                <MdAccountBox size={25} className="mx-auto h-6"/>
                <span className="text-xs">Sign Up</span>
            </a>
        </Link>
    );
};

export default SignupButton;
