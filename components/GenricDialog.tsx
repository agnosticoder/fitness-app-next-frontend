import { Dialog } from "@headlessui/react";
import { useAtom } from "jotai";
import Button from "./Button";

interface GenricDialogProps {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen?: (update: boolean) => void;
}

const GenricDialog = ({ children, isOpen, setIsOpen}: GenricDialogProps) => {

    const handleOnClose = () => {
        console.log("handleOnClose");
        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleOnClose} className='z-50'>
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