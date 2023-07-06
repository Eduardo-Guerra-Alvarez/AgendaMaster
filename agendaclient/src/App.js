import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Meeting from './Components/Meeting/Meeting'
import Menu from './Components/Menu/Menu'
import Users from './Components/Users/Users'
import ErrorPage from "./Components/404/404"
import { 
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Menu />,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "meetings",
                    element: <Meeting />
                },
                {
                    path: "users",
                    element: <Users />
                }

            ]
        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "register",
            element: <Register />
        },
    ]);
  return (
      <>
          <RouterProvider router={router} />
      </>
  );
}

export default App;
