import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Profile from "./components/Profile/Profile.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import UserGuest from "./components/UserGuest/UserGuest.jsx";
import UserContextProvider from "./context/UserContext.jsx";

import "./App.css";
import UserAccount from "./components/UserAccount/UserAccount.jsx";

let routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <UserAccount>
            <Home />
          </UserAccount>
        ),
      },
      {
        path: "login",
        element: (
          <UserGuest>
            <Login />
          </UserGuest>
        ),
      },
      {
        path: "register",
        element: (
          <UserGuest>
            <Register />
          </UserGuest>
        ),
      },
      {
        path: "profile",
        element: (
          <UserAccount>
            <Profile />
          </UserAccount>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={routes} />
    </UserContextProvider>
  );
}

export default App;
