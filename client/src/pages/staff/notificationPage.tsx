import React, { useState } from "react";

const NotificationPage: React.FC = () => {
  const [selectedNotification, setSelectedNotification] = useState<null | number>(null);
  const [readNotifications, setReadNotifications] = useState<number[]>([]);
  const notifications = [
    { id: 1, title: "Profile updated", details: "Your personal information has been successfully updated. ABC ABCXYZ" },
    { id: 2, title: "Account credentials", details: "Your account credentials have been updated." },
    { id: 3, title: "Password changed", details: "Your password was successfully changed." },
    { id: 4, title: "Email verified", details: "Your email address has been verified successfully." },
    { id: 5, title: "Security alert", details: "A new login was detected from a new device." },
    { id: 6, title: "Subscription renewed", details: "Your subscription has been successfully renewed." },
  ];

  const totalPages = 4;

  const handleNotificationClick = (index: number) => {
    setSelectedNotification(index);
    if (!readNotifications.includes(index)) {
      setReadNotifications((prev) => [...prev, index]);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center space-x-3">
          <h3 className="text-yellow-400 text-2xl font-semibold">
            Notification
          </h3>
          <div className="h-1 w-60 bg-yellow-400"></div>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        {/* Hiển thị chi tiết thông báo khi chọn */}
        {selectedNotification !== null ? (
          <div className="text-gray-200">
            <h3 className="text-yellow-300 mb-2 font-bold">
              {notifications[selectedNotification].title}
            </h3>
            <p className="mb-4">{notifications[selectedNotification].details}</p>
            <button
              onClick={() => setSelectedNotification(null)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Back
            </button>
          </div>
        ) : (
          // Hiển thị danh sách thông báo
          <div>
            <ul className="space-y-2">
              {notifications.map((notification, index) => (
                <li
                  key={notification.id}
                  className="bg-gray-600 p-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-500"
                  onClick={() => handleNotificationClick(index)}
                >
                  {notification.title} {readNotifications.includes(index) ? <span>✔️</span> : null}
                </li>
              ))}
            </ul>
            {/* Pagination */}
            <div className="text-center mt-4 text-yellow-300">
              <span className="cursor-pointer hover:text-yellow-400">&lt;</span>
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <span
                  key={pageIndex}
                  className="mx-1 cursor-pointer font-bold hover:text-yellow-400"
                >
                  {pageIndex + 1}
                </span>
              ))}
              <span className="cursor-pointer hover:text-yellow-400">&gt;</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
