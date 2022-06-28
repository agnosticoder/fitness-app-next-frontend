import Button from "./Button";
import NiceModal from "@ebay/nice-modal-react";
import NiceModalComponent from "./NiceModalComponent";
import NiceConfirmationModal from "./NiceConfirmationModal";

NiceModal.register('modal', NiceModalComponent);
NiceModal.register('confirm', NiceConfirmationModal);

const DialogWithLocalState = () => {


    const showNiceModal = () => {
        NiceModal.show('modal');
    }

    return (
        <div>
            <Button onClick={showNiceModal}>Open dialog</Button>
        </div>
    );
};

export default DialogWithLocalState;