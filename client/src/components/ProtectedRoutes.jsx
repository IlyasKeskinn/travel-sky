import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// ProtectedRoutes component checks user access
export const ProtectedRoutes = ({ condition, routes = "/" }) => {
    return (
        <div>

            {condition ?
                // If the user meets the condition, render the Outlet with inner content
                (
                    <Outlet />
                ) :
                // If the condition is not met, redirect the user to the specified route
                (
                    <Navigate replace:true to={`${routes ? routes : "/"}`} />
                )}
        </div>
    );
};

ProtectedRoutes.propTypes = {
    condition: PropTypes.bool.isRequired,
    routes: PropTypes.string,
};