import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root';
import { RouterProvider } from 'react-router-dom';
import NotFound from './components/404';
import List, {
  loader as listLoader,
  action as listAction,
} from './routes/category/List';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      // {
      //   index: true,
      //   element: <Root />,
      //   loader: listLoader,
      //   action: listAction,
      // },
      {
        path: '/category/:id/:page',
        element: <List />,
        loader: listLoader,
        action: listAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
