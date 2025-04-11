
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    if (authService.isAuthenticated()) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  
  return null;
};

export default Index;
