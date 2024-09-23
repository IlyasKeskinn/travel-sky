import { Route, Routes } from "react-router"
import { ROUTES } from "./config/routes";
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import FlightResult from "./pages/FlightResult";
import LoginPage from "./pages/LoginPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/user";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import UserProfile from "./pages/UserProfile";
import BookConfirm from "./pages/BookConfirm";
import Flights from "./pages/Flights";



function App() {
  const user = useRecoilValue(userAtom); // Get the current user from Recoil state
  const isUserLoggedIn = user?._id ? true : false;


  return (
    <Routes>
      {/* The main layout  */}
      <Route path="/" element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.FLIGHT_RESULT} element={<FlightResult />} />
      </Route>

      {/* Protected route for login page, accessible only if user is not logged in */}
      <Route element={<ProtectedRoutes condition={!isUserLoggedIn} routes={ROUTES.HOME} />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>

      {/* Protected route for authenticated users */}
      <Route element={<ProtectedRoutes condition={isUserLoggedIn} routes={ROUTES.LOGIN} />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.FLIGHTS} element={<Flights />} />
          <Route path={ROUTES.PROFILE} element={<UserProfile />} />
          <Route path={ROUTES.BOOK_CONFIRM} element={<BookConfirm />} />
        </Route>
      </Route>


    </Routes>
  );
}


export default App
