import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserAstronaut } from 'react-icons/fa';
import { MdAccountBox } from 'react-icons/md';

const UserProfile = () => {
    const router = useRouter();
    const active = router.pathname === "/profile";

    return (
        <Link href="/profile">
            <a className={`${active ? "text-zinc-200" : "text-zinc-200/50"}`}>
                <FaUserAstronaut size={25} className="mx-auto h-6"/>
                <span className="text-xs">Profile</span>
            </a>
        </Link>
    );
};

export default UserProfile;
