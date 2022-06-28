import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from './Button';
import GenricDialog from './GenricDialog';

const NiceConfirmationModal = NiceModal.create(() => {
    const { visible, hide } = useModal();

    return (
        <GenricDialog isOpen={visible}>
            <div className="flex flex-col items-center">
                <div className="text-2xl mb-4">Confirmation Dialog</div>
                <Button
                    onClick={() => {
                        NiceModal.hide('confirm');
                        NiceModal.hide('modal');
                    }}
                >
                    Confirm
                </Button>
                <Button
                    onClick={() => {
                        NiceModal.hide('confirm');
                    }}
                >
                    Cancel
                </Button>
            </div>
        </GenricDialog>
    );
});

export default NiceConfirmationModal;
