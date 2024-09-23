import userAtom from "@/atoms/user"; // Assuming user data is stored in Recoil
import axios from "axios";
import { useRecoilState } from "recoil";
import { API_ROUTES } from "@/config/api";
import Avatar from "@/components/Avatar";
import useErrorHandler from "@/hooks/useErrorHandler";
import { Button } from "@/components/ui/button";


const UserProfile = () => {
    const [user, setUser] = useRecoilState(userAtom); // Get user data from Recoil
    const handleError = useErrorHandler(); // Use the custom hook for error handling



    const handleLogout = async () => {
        try {
            const response = await axios.get(API_ROUTES.LOGOUT); // Call the logout API
            if (response.status === 200) {
                setUser(null); // Clear user data in Recoil
                localStorage.removeItem("user"); // Remove user data from localStorage
            }
        } catch (error) {
            handleError(error);
        }
    };


    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-center items-center">
                <div className="bg-white shadow-md rounded-md p-4 mb-6 w-96">
                    <div className="flex flex-col items-center">
                        <div>
                            <Avatar />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 mt-2">
                            <p className="">Name : {user.name}</p>
                            <p className="">Email : {user.email}</p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            className="my-4"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
