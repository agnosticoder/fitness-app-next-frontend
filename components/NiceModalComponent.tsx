import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from './Button';
import GenricDialog from './GenricDialog';

const NiceModalComponent = NiceModal.create(() => {
    const {visible, hide} = useModal();

    return (
        <GenricDialog isOpen={visible} setIsOpen={() => NiceModal.show('confirm')}>
            <div className="flex flex-col items-center">
                <div className="text-2xl mb-4">Dialog with local state</div>
                <Button onClick={() => hide()}>Open Confirmation Dialog</Button>
            </div>
        </GenricDialog>
    );
});

export default NiceModalComponent;
