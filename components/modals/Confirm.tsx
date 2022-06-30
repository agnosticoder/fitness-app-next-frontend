import { useAtom } from "jotai";
import Button from "../Button";
import GenricDialog from "../GenricDialog";
import { confirmDialogAtom } from "../store/atoms";

const Confrim = ({hide, reset}: {hide: () => void, reset?: () => void}) => {
    const [isOpen, setIsOpen] = useAtom(confirmDialogAtom)

    return (
        <GenricDialog isOpen={isOpen} setIsOpen={setIsOpen}>
            <div>
                <h1>Are you sure you want to close this dialog?</h1>
                <div className="flex justify-center">
                    <Button
                        onClick={() => {
                            reset && reset();
                            hide();
                            setIsOpen(false);
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        No
                    </Button>
                </div>
            </div>
        </GenricDialog>
    );
};

export default Confrim;