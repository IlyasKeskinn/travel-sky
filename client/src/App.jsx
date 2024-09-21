import { Route, Routes } from "react-router"
import { ROUTES } from "./config/routes";
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import FlightResult from "./pages/FlightResult";



function App() {
  return (
    <Routes>
      {/* The main layout */}
      <Route path="/" element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.FLIGHT_RESULT} element={<FlightResult />} />
      </Route>
    </Routes>
  );
}


export default App
