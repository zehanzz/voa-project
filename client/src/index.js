import React from "react";
import ReactDOM from 'react-dom';

import './index.css';
import App from "./App";
import { AuthContexProvider } from "./contexts/authContext";
import { ContextProvider } from './contexts/ContextProvider';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <ContextProvider>
//       <AuthContexProvider>
//         <App />
//       </AuthContexProvider>
//     </ContextProvider>
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>

    <AuthContexProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AuthContexProvider>

  </React.StrictMode>,
  document.getElementById('root'),
);