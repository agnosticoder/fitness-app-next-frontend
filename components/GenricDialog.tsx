import { Dialog } from "@headlessui/react";
import {AnimatePresence, motion} from 'framer-motion';

interface GenricDialogProps {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen?: (update: boolean) => void;
}

const GenricDialog = ({ children, isOpen, setIsOpen}: GenricDialogProps) => {
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
                onClose={handleOnClose}>
                    <div className="fixed inset-0 bg-zinc-500/40 z-50" aria-hidden={true} />
                    <div className="fixed inset-0 z-50">
                        <Dialog.Panel className='w-full h-full flex justify-center items-center'>{children}</Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default GenricDialog;