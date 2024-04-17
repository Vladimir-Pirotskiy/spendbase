import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store, persistor} from "@/store.ts";
import {PersistGate} from 'redux-persist/integration/react'
import {TonConnectUIProvider} from "@tonconnect/ui-react";

const manifestUrl = 'URL';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App/>
        </PersistGate>
      </Provider>
    </TonConnectUIProvider>
  </React.StrictMode>,
)
