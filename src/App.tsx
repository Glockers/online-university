import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routing } from './page/Router'
import { useAppSelector } from './utils/hooks/redux';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import "antd/dist/reset.css";
import { NotificationProvider } from './utils/notification';

function App() {

    return (
        <BrowserRouter>
            <Provider store={setupStore}>
                <NotificationProvider>
                    <Routing />
                </NotificationProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App
