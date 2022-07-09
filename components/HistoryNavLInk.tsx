import Link from "next/link";
import { useRouter } from "next/router";
import { FaHistory } from "react-icons/fa";

const HistoryNavLink = () => {
    const router = useRouter();
    const active = router.pathname === "/history";

    return (
        <Link href="/history">
            <a className={`${active ? "text-zinc-200" : "text-zinc-200/50"}`}>
                <FaHistory size={25} className="mx-auto h-6"/>
                <span className="text-xs">History</span>
            </a>
        </Link>
    );
};

export default HistoryNavLink;
