import { createContext, useContext } from "react";
import { MessageInstance, NoticeType } from "antd/es/message/interface";
import { message } from "antd";

type UseMessageReturnType = {
    showMessage: (text: string, type: NoticeType) => void;
    MessageContainer: MessageInstance;
    contextHolder: any;
};

const NotificationContext = createContext<UseMessageReturnType | undefined>(undefined);

export const useNotification = (): UseMessageReturnType => {
    const [MessageContainer, contextHolder] = message.useMessage();

    function showMessage(text: string, type: NoticeType) {
        MessageContainer.open({
            type: type,
            content: text,
        });
    }

    return { showMessage, MessageContainer, contextHolder };
};

type NotificationProviderProps = {
    children: React.ReactNode;
};

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const notification = useNotification();

    return (
        <NotificationContext.Provider value={notification}>
            {notification.contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotificationContext must be used within a NotificationProvider');
    }
    return context;
};


// export const { showMessage } = useNotificationContext()