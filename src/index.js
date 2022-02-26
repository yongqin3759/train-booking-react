import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Bookings from "./routes/bookings";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="booking" element={<Bookings />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);