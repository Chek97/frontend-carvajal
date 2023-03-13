import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ContactFormPage } from '../pages/ContactFormPage';
import { ContactsPage } from '../pages/ContactsPage';

export const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <ContactsPage /> 
        },
        {
            path: '/create',
            element: <ContactFormPage /> 
        },
        {
            path: '/create/:id',
            element: <ContactFormPage /> 
        },
    ]);

  return (<RouterProvider router={router} />)
}
