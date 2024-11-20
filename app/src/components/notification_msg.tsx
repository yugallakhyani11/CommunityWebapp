import { useState, useEffect } from "react";

const Notification = () => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    const subscription = notificationService
      .getNotification()
      .subscribe((notification) => {
        setNotification(notification);

        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="notification">
      {notification && (
        <div className={`notification-msg ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};
