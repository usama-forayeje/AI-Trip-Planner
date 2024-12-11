import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { UserCircle, X, Loader } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
function Header() {
    // States for managing dialog and loading state
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const user = JSON.parse(localStorage.getItem("user") || "null"); // Retrieving user data from localStorage
    useEffect(() => {
        // For debugging purposes: logging the user object
        console.log(user);
    }, [user]);
    // Handle Google login
    const login = useGoogleLogin({
        onSuccess: (res) => getUserProfile(res),
        onError: (error) => {
            console.error(error);
            toast.error("Failed to login with Google. Please try again.");
        },
    });
    // Fetch user profile after successful Google login
    const getUserProfile = async (tokenInfo) => {
        setLoading(true); // Start loading
        try {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: "application/json",
                },
            });
            // Save user data to localStorage
            localStorage.setItem("user", JSON.stringify(res.data));
            setOpenDialog(false); // Close the dialog
            window.location.reload(); // Reload the page to reflect the logged-in state
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to fetch user profile. Please try again.");
        }
        finally {
            setLoading(false); // Stop loading
        }
    };
    // Handle Logout
    const handleLogout = () => {
        googleLogout(); // Logout from Google
        localStorage.clear(); // Clear localStorage on logout
        window.location.reload(); // Reload page after logout
    };
    return (_jsxs("div", { className: "flex items-center justify-between p-4 bg-white shadow-md", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { className: "w-10 h-10 rounded-full", src: "/forayaje-ai-trip .jpg", alt: "logo" }), _jsx("h2", { className: "font-serif text-lg font-bold", children: "Forayaje AI Trip" })] }), _jsx("div", { children: user ? (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("a", { href: "/my-trips", children: _jsx(Button, { variant: "outline", className: "rounded-lg", children: "My Trips" }) }), _jsx("a", { href: "/create-trip", children: _jsx(Button, { variant: "outline", className: "rounded-lg", children: "+ Create Trip" }) }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { children: _jsx("img", { className: "rounded-full cursor-pointer w-9 h-9", src: user.picture, alt: "profile" }) }), _jsx(PopoverContent, { className: "w-32", children: _jsx("button", { className: "w-full px-4 py-2 text-sm text-left text-rose-600 hover:bg-gray-100", onClick: handleLogout, children: "Log Out" }) })] })] })) : (_jsx(Button, { onClick: () => setOpenDialog(true), children: "Sign In" })) }), _jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: _jsxs(DialogContent, { className: "max-w-md", children: [_jsx("button", { onClick: () => setOpenDialog(false), className: "absolute p-1 text-gray-500 rounded-full top-3 right-3 hover:bg-gray-200", "aria-label": "Close", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs(DialogHeader, { className: "flex flex-col items-center", children: [_jsxs("div", { className: "flex items-center gap-3 mt-4", children: [_jsx("img", { src: "/forayaje-ai-trip.jpg", alt: "Forayaje AI Logo", className: "w-16 h-16 rounded-full ring-2 ring-primary" }), _jsx("h2", { className: "text-xl font-bold", children: "Forayaje AI Trip Planner" })] }), _jsx(DialogTitle, { className: "mt-6 text-lg font-bold", children: "Sign In With Google" })] }), _jsx(DialogDescription, { className: "mt-2 text-sm text-center text-muted-foreground", children: "Sign in to access personalized trip plans, itinerary suggestions, and more. Your account is safe and secure." }), _jsx("div", { className: "mt-6", children: _jsx(Button, { className: "flex items-center justify-center w-full gap-2", onClick: login, disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader, { className: "w-5 h-5 animate-spin" }), "Processing..."] })) : (_jsxs(_Fragment, { children: [_jsx(UserCircle, { className: "w-5 h-5" }), "Sign In With Google"] })) }) })] }) })] }));
}
export default Header;
