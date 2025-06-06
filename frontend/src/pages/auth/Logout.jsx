import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

function Logout() {
  const { logout, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        toast.success("Logged out successfully");
        navigate("/login");
      } catch (err) {
        toast.error(error || "Error logging out");
      }
    };

    performLogout();
  }, [logout, navigate, error]);

  return (
    <div className="text-center mt-4 text-gray-600">
      Logging out...
    </div>
  );
}

export default Logout;
