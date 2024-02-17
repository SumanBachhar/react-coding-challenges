import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([{ path: "/", element: <Navbar /> }]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
