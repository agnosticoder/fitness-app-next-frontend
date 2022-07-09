import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdAddCircle } from "react-icons/io";

const StartWorkoutNavLink = () => {
    const router = useRouter();
    const active = router.pathname === "/";

    return (
        <Link href="/">
            <a className={`${active ? "text-zinc-200" : "text-zinc-200/50"}`}>
                <IoMdAddCircle className="mx-auto h-6" size={25}/>
                <span className="text-xs">Start Workout</span>
            </a>
        </Link>
    );
};

export default StartWorkoutNavLink;
