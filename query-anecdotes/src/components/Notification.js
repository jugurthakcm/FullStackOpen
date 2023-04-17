import { useContext } from "react";
import notificationContext from "../context/NotificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const notification = useContext(notificationContext)[0];

  return (
    notification.visible && <div style={style}>{notification.content}</div>
  );
};

export default Notification;
