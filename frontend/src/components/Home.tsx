import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "../services/api.service";
import { UserDto } from "../shared/dtos/userDto";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDto>();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signin");
    }
    fetchProfile();
  }, [navigate]);
  const fetchProfile = async () => {
    const userData = await apiService.fetchProfile();
    if (userData) setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/signin");
  };

  return (
    <Card
      sx={{ maxWidth: 400, margin: "auto", marginTop: "20px", padding: "20px" }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Hello {user?.name || "Guest"}, welcome to the Application!
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </CardActions>
    </Card>
  );
};

export default Home;
