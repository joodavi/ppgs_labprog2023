import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Programas from './pages/programas';
import LoginPage from './pages/login'
import Docente from './pages/docente';
// import AdminPage from './pages/admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Programas />
  },
  {
    path: "/programas",
    element: <Programas />
  },
  {
    path: "/docente",
    element: <Docente />
  },
  {
    path: "/auth",
    element: <LoginPage />
  },
  // {
  //   path: "/admin",
  //   element: <AdminPage />
  // }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}