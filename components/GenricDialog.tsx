import { Dialog } from "@headlessui/react";
import {AnimatePresence, motion} from 'framer-motion';
import { useEffect } from "react";
import {isMobile} from "react-device-detect";

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

    // overflow none when isOpen is true: because headlessui dialog scroll lock was not working on safari
    //Todo: Make this shit work on safari
    // useEffect(() => { 
    //     if (isMobile) {
    //         if (isOpen) {
    //             document.body.style.position = 'fixed';
    //         } else {
    //             setTimeout(() => {
    //                 document.body.style.position = 'static';
    //             }, 50);
    //         }
    //     }
    // }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    static
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    as={motion.div}
                    open={isOpen}
                    onClose={handleOnClose}
                >
                    <motion.div
                    initial={{ backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
                    animate={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
                    exit={{ backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
                    transition={{ duration: 0.2 }}
                     className="fixed inset-0 bg-zinc-500/40 z-50" aria-hidden={true} />
                    <div className="fixed inset-0 z-50">
                        <Dialog.Panel className="w-full h-full flex justify-center items-center">
                            {children}
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default GenricDialog;