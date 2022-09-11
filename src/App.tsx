import { ToastContainer } from "react-toastify";
import { TodoList } from "./pages/TodoList";

import "./styles/global.css";
import "react-toastify/ReactToastify.min.css";

export function App() {
  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={1000 * 3}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={false}
      />
      <TodoList />
    </>
  );
}
