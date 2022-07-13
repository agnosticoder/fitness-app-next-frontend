import Link from 'next/link';
import { useRouter } from "next/router";
import { IoMdFitness } from "react-icons/io";

const ExercisesNavLink = () => {
    const router = useRouter();
    const active = router.pathname === '/exercises';

    return (
        <Link href='/exercises'>
            <a className={`${active ? 'text-zinc-200' : 'text-zinc-200/50'}`}>
                <IoMdFitness size={25} className="mx-auto h-6" />
                <span className="text-xs">Exercises</span>
            </a>
        </Link>
    );
};

export default ExercisesNavLink;
