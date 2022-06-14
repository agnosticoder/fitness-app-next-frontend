import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

interface ConfirmDialogProps {
    isConfirmDialogOpen: boolean,
    setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

const ConfirmDialog = ({isConfirmDialogOpen, setIsConfirmDialogOpen, setIsDialogOpen}: ConfirmDialogProps) => {

    const onConfirmYes = () => {
        setIsConfirmDialogOpen(false);
        setIsDialogOpen(false);
    };

    const onConfirmNo = () => {
        setIsConfirmDialogOpen(false);
    };

    return (
        <Dialog open={isConfirmDialogOpen} onClose={() => { }} className='z-50'>
            <div className='fixed inset-0 bg-slate-500/50' aria-hidden={true} />
            <div className="fixed inset-0 flex justify-center items-center">
                <Dialog.Panel className="bg-slate-300 p-4 rounded-md">
                    <Dialog.Title>Are you sure to close?</Dialog.Title>
                    <Button onClick={onConfirmYes}>Yes</Button>
                    <Button onClick={onConfirmNo}>Cancel</Button>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default ConfirmDialog;