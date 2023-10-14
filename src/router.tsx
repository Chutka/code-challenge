import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components';
import { Main, Challenge } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Main />
      },
      {
        path: '/:id',
        element: <Challenge />
      }
    ]
  },
]);


