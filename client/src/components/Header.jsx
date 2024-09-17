import { Link, NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { ROUTES } from "@/constants/routes";
import { MENU_ITEMS } from "@/constants/menuItems";
import Avatar from "./Avatar";

/**
 * The header component of the application.
 * It contains the logo, the search menu item, the flights menu item, and the login/profile menu item.
**/

const Header = () => {
    const user = true; // Simulates user authentication status

    // Utility for active class on NavLink
    const activeLinkClasses = (isActive) =>
        `relative text-white text-md transition-all bg-slate-600/50 py-2 px-4 rounded-lg duration-200 hover:bg-slate-600/70 ${isActive ? "bg-slate-700/90" : ""}`;

    return (
        <div className="w-full top-0 left-0 absolute">
            <div className="flex justify-between items-center gap-4 px-4 py-2">
                {/* Logo and Branding */}
                <Link to={ROUTES.HOME}>
                    <div id="header_logo" className="flex flex-col justify-center items-center">
                        <div className="h-16 w-16">
                            <img src="/assets/logo.png" alt="Logo" className="w-full h-full" />
                        </div>
                        <p className="text-lg font-semibold text-white">
                            Travel Sky
                        </p>
                    </div>
                </Link>
                {/* Navigation Menu */}
                <div id="header_menu">
                    <div id="header_menu_items" className="flex gap-4 items-center justify-between">
                        {/* Search Flights Menu Item */}
                        <NavLink
                            to={ROUTES.SEARCH_FLIGHTS}
                            className={({ isActive }) => activeLinkClasses(isActive)}>
                            <div className="flex items-center gap-2">
                                <IoIosSearch className="text-white" size={"1.5rem"} />
                                <p className="hidden md:block text-white">{MENU_ITEMS.SEARCH}</p>
                            </div>
                        </NavLink>
                        {user ? (
                            <>
                                {/* Flights Menu Item */}
                                <NavLink
                                    to={ROUTES.FLIGHTS}
                                    className={({ isActive }) => activeLinkClasses(isActive)}>
                                    {MENU_ITEMS.FLIGHTS}
                                </NavLink>
                                {/* Profile Avatar */}
                                <Link to={ROUTES.PROFILE}>
                                    <div className="rounded-full p-1 flex items-center justify-center bg-vegetation/80">
                                        <Avatar size="xs" />
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Login Button */}
                                <div className="flex items-center justify-center gap-2 bg-vegetation text-white py-2 px-4 rounded-full cursor-pointer hover:bg-vegetation/80 transition-colors duration-200">
                                    {MENU_ITEMS.LOGIN}
                                    <IoIosLogIn className="h-4 w-4" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
