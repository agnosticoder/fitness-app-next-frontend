import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from '../Button';
import GenricDialog from '../GenricDialog';

interface ConfirmCloseProps {
    hideDialog: () => void;
    reset?: () => void;
}

const ConfirmClose = NiceModal.create(({ hideDialog, reset }: ConfirmCloseProps) => {
    const { visible, hide } = useModal();

    return (
        <GenricDialog isOpen={visible}>
            <div>
                <h1>Are you sure you want to close this dialog?</h1>
                <div className="flex justify-center">
                    <Button
                        onClick={() => {
                            reset && reset();
                            hideDialog();
                            hide();
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={() => {
                            hide();
                        }}
                    >
                        No
                    </Button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default ConfirmClose;