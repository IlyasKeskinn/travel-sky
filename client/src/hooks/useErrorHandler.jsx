// hooks/useErrorHandler.js
import { useToast } from "@/hooks/use-toast";

const useErrorHandler = () => {
    const { toast } = useToast();  // Initialize the toast function

    // Function to handle errors
    const handleError = (error) => {
        let errorMessage = "An unexpected error occurred";
        if (error.response && error.response.data) {
            errorMessage = error.response.data.error; // Extract the backend error message
        } else {
            errorMessage = error.message; // Use a general error message
        }
        // Display the error message as a toast notification
        toast({
            variant: "destructive",
            title: "Operation failed.",
            description: errorMessage,
        });
    };

    return handleError;
};

export default useErrorHandler;
