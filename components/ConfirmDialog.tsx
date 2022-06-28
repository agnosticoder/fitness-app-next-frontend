import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import GenricDialog from "./GenricDialog";

interface ConfirmDialogProps {
    isConfirmDialogOpen: boolean,
    setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

const ConfirmDialog = ({ isConfirmDialogOpen, setIsConfirmDialogOpen, setIsDialogOpen }: ConfirmDialogProps) => {
    const onConfirmYes = () => {
        setIsConfirmDialogOpen(false);
        setIsDialogOpen(false);
    };

    const onConfirmNo = () => {
        setIsConfirmDialogOpen(false);
    };

    return (
        <GenricDialog isOpen={isConfirmDialogOpen}>
            <Dialog.Title>Are you sure to close?</Dialog.Title>
            <Button onClick={onConfirmYes}>Yes</Button>
            <Button onClick={onConfirmNo}>Cancel</Button>
        </GenricDialog>
    );
};

export default ConfirmDialog;