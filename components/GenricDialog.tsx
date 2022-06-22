import { Dialog } from "@headlessui/react";
import { useAtom } from "jotai";
import Button from "./Button";
import { getDialogAtom, setDialogAtom } from "./store/atoms";

const GenricDialog = ({ children }: { children: React.ReactNode }) => {
    const [isOpen] = useAtom(getDialogAtom);
    const [,setIsOpen] = useAtom(setDialogAtom);

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='z-50'>
            <div className='fixed inset-0 bg-slate-500/50' aria-hidden={true} />
            <div className="fixed inset-0 flex justify-center items-center">
                <Dialog.Panel className="bg-slate-300 p-4 rounded-md">
                    {children}
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default GenricDialog;