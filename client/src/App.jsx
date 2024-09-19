import { Route, Routes } from "react-router"
import { ROUTES } from "./config/routes";
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"



function App() {
  return (
    <Routes>
      {/* The main layout of the app */}
      <Route path="/" element={<MainLayout />}>
        {/* The default route of the app */}
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route>
    </Routes>
  );
}


export default App
