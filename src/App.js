import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import MainView from "./Components";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Preloader from "./Common/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      {
        /* Your fetched data */
      }

      setLoading(false);
    }, 1200); // Simulate a 2-second delay for fetching data
  }, []);
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {loading ? <Preloader /> : <MainView />}
      </BrowserRouter>
    </>
  );
}

export default App;
