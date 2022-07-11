import { useAtomValue } from 'jotai';
import { useEffect, useId, useState, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import Notification from './Notification';
import { getNotificationAtom } from './store/atoms';

const NotificationPortal = () => {
    const notifications = useAtomValue(getNotificationAtom);
    const [loaded, setLoaded] = useState(false);
    const id = useId();

    // const onClose = ({ toastId }: { toastId: string }) => {
    //     setToasts(toasts.filter((toast) => toast.toastId !== toastId));
    // };

    useEffect(() => {
        const div = document.createElement('div');
        div.id = `toast-portal-${id}`;
        div.className = 'fixed top-0 right-0 m-4 z-50';
        document.body.prepend(div);
        console.log('ToastPortal', div);
        setLoaded(true);

        return () => document.getElementById(`toast-portal-${id}`)?.remove();
    }, [id]);

    return loaded
        ? createPortal(
              notifications.map((n) => (
                  <div key={n.notificationId}>
                      <Notification
                          message={n.message}
                          mode={n.mode}
                          notificationId={n.notificationId}
                        //   onClose={() => onClose({ toastId: t.toastId })}
                      />
                  </div>
              )),
              document.getElementById(`toast-portal-${id}`) as HTMLElement
          )
        : null;
};

export default NotificationPortal;
