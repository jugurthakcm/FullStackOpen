import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "showNotification":
      return { ...state, content: action.payload, visible: true };

    case "clearNotification":
      return { ...state, content: "", visible: false };

    default:
      return state;
  }
};

const notificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    content: "",
    visible: false,
  });

  return (
    <notificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </notificationContext.Provider>
  );
};

export default notificationContext;
