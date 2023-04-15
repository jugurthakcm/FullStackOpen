import { useEffect } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  const notification = useSelector((state) => state.notification);

  useEffect(() => {}, [notification]);

  return (
    notification.visible && <div style={style}>{notification.content}</div>
  );
};

export default Notification;
