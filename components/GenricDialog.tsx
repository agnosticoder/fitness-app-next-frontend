import { Dialog } from "@headlessui/react";
import {AnimatePresence, motion} from 'framer-motion';

interface GenricDialogProps {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen?: (update: boolean) => void;
}

const GenricDialog = ({ children, isOpen, setIsOpen }: GenricDialogProps) => {
    const handleOnClose = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog 
                static 
                initial = {{opacity: 0}}
                animate = {{opacity: 1}}
                exit = {{opacity: 0}}
                transition = {{duration: 0.15}}
                as={motion.div} 
                open={isOpen} 
                onClose={handleOnClose} 
                className="z-50">
                    <div className="fixed inset-0 bg-slate-500/50" aria-hidden={true} />
                    <div className="fixed inset-0 flex justify-center items-center">
                        <Dialog.Panel className="bg-slate-300 p-4 rounded-md">{children}</Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default GenricDialog;