import { FaInfo } from 'react-icons/fa';
import {TiInfoLargeOutline} from 'react-icons/ti';

export type NotificationProps = {
    mode: 'info' | 'success' | 'warning' | 'error';
    message: string;
    notificationId: string;
    onClose?: () => void;
}

const infoClass = 'bg-zinc-400 text-zinc-900 p-2 rounded-lg';
const successClass = 'bg-green-200 text-green-600 p-2 rounded-lg';
const warningClass = 'bg-orange-200 text-orange-600 p-2 rounded-lg';
const errorClass = 'bg-red-200 text-red-600 p-2 rounded-lg';

const Notification = ({ mode, message, notificationId, onClose }: NotificationProps) => {
    const className =
        mode === 'info'
            ? infoClass
            : mode === 'success'
            ? successClass
            : mode === 'warning'
            ? warningClass
            : errorClass;

    return (
        <div className='relative drop-shadow-2xl p-2 rounded-xl text-center text-base sm:mx-8 tracking-wide'>
            <div className={className}>
                <FaInfo className='inline-block mr-2 text-orange-700' size={20}/>
                {message}
                <FaInfo className='inline-block ml-2 text-orange-700' size={20}/>
                </div>
            {/* <button className='absolute top-0 right-0' onClick={onClose}>X</button> */}
        </div>
    );
};

export default Notification;