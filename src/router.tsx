import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './app';
import ErrorPage from './errorPage';

const Tool1 = React.lazy(() => import("./routes/tool1Page"));
const Tool2 = React.lazy(() => import("./routes/tool2Page"));

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Tool1 num={1} />
      },
      {
        path: "/tool1",
        element: <Tool1 num={1} />
      },
      {
        path: "/tool2",
        element: <Tool2 num={2} />
      }
    ]
  }
], { basename: "/" });