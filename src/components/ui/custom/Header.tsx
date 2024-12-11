import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { UserCircle, X, Loader } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

// Defining the structure of the user data stored in localStorage
interface User {
  picture: string;
  name: string;
  email: string;
}

function Header() {
  // States for managing dialog and loading state
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null"); // Retrieving user data from localStorage

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
  const getUserProfile = async (tokenInfo: any) => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false); // Close the dialog
      window.location.reload(); // Reload the page to reflect the logged-in state
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch user profile. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle Logout
  const handleLogout = () => {
    googleLogout(); // Logout from Google
    localStorage.clear(); // Clear localStorage on logout
    window.location.reload(); // Reload page after logout
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full"
          src="/forayaje-ai-trip.jpg" // Corrected the image path
          alt="logo"
        />
        <h2 className="font-serif text-lg font-bold">Forayaje AI Trip</h2>
      </div>

      {/* User Interaction */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            {/* My Trips Button */}
            <a href="/my-trips">
              <Button variant="outline" className="rounded-lg">
                My Trips
              </Button>
            </a>

            {/* Create Trip Button */}
            <a href="/create-trip">
              <Button variant="outline" className="rounded-lg">
                + Create Trip
              </Button>
            </a>

            {/* User Profile */}
            <Popover>
              <PopoverTrigger>
                <img
                  className="rounded-full cursor-pointer w-9 h-9"
                  src={user.picture} // Updated to use non-optional chaining
                  alt="profile"
                />
              </PopoverTrigger>
              <PopoverContent className="w-32">
                <button
                  className="w-full px-4 py-2 text-sm text-left text-rose-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <button
            onClick={() => setOpenDialog(false)}
            className="absolute p-1 text-gray-500 rounded-full top-3 right-3 hover:bg-gray-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <DialogHeader className="flex flex-col items-center">
            <div className="flex items-center gap-3 mt-4">
              <img
                src="/forayaje-ai-trip.jpg" // Ensure the image path is correct
                alt="Forayaje AI Logo"
                className="w-16 h-16 rounded-full ring-2 ring-primary"
              />
              <h2 className="text-xl font-bold">Forayaje AI Trip Planner</h2>
            </div>
            <DialogTitle className="mt-6 text-lg font-bold">
              Sign In With Google
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mt-2 text-sm text-center text-muted-foreground">
            Sign in to access personalized trip plans, itinerary suggestions,
            and more. Your account is safe and secure.
          </DialogDescription>

          <div className="mt-6">
            <Button
              className="flex items-center justify-center w-full gap-2"
              onClick={() => login()}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <UserCircle className="w-5 h-5" />
                  Sign In With Google
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
