import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components';
import { Challenge } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // {
      //   path: '',
      //   element: <Main />
      // },
      {
        path: '',
        element: <Challenge />
      }
    ]
  },
]);


