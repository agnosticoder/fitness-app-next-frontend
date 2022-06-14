import {createPortal} from 'react-dom';

const ErrorMessagePortal = ({children}: {children: string}) => {
    const errorMessageNode = document.getElementById('error-message');
    if(!errorMessageNode) {
        return null;
    }
    return createPortal(
        <div className="fixed top-0 left-0 right-0 z-50 bg-orange-400 text-white text-center p-2">
            <p>{children}</p>
        </div>,
        errorMessageNode
    );
}

export default ErrorMessagePortal;