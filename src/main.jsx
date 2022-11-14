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
} from './routes/List';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <List />,
        loader: listLoader,
        action: listAction,
      },
      {
        path: 'movie/:id',
        element: <h1>This is going to be single movie page</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
