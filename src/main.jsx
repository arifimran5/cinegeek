import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root';
import { RouterProvider } from 'react-router-dom';
import NotFound from './components/404';
import List, {
  loader as listLoader,
  action as listAction,
} from './routes/List';
import Movie, { loader as movieLoader } from './routes/Movie';

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
        path: 'movie',
        element: <Movie />,
        errorElement: <NotFound />,
        loader: movieLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
