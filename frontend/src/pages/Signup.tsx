import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button, keyframes } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Keyframe for rotating the logo
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box
      width={"100vw"}
      height={"92vh"}
      display="flex"
      sx={{
        backgroundColor: "#0a0f2c", // Dark blue background matching the header
        backgroundImage: `
          radial-gradient(circle, rgba(13, 27, 42, 0) 0%, rgba(0, 0, 0, 0.8) 70%, #0a0f2c 100%),
          radial-gradient(circle, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
          linear-gradient(180deg, rgba(0, 0, 30, 0.8) 0%, rgba(0, 0, 15, 1) 100%)`,
        backgroundSize: "cover, 3px 3px, 100% 100%",
        backgroundPosition: "center center, center center, center center",
        justifyContent: "center", // Center the content horizontally
        alignItems: "center", // Center the content vertically
        flexDirection: "column", // Stack content vertically
        overflow: "hidden", // Prevent scrolling
      }}
    >
      {/* Rotating Logo at the Top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          animation: `${rotate} 10s linear infinite`, // Apply rotating animation
          mb: 2, // Margin bottom to create space below the logo
        }}
      >
        <img
          src="nexus.png"
          alt="OpenAI Logo"
          style={{ width: "130px", height: "130px" }}
        />
      </Box>

      {/* New Line for the Message with Updated Styling */}
      <Typography
        variant="h5"
        sx={{
          color: "#ffffff",
          textAlign: "center",
          mb: 4, // Margin bottom to create space below the message
          fontWeight: 600,
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)", // Adds a cool shadow effect
          letterSpacing: "0.05em", // Adds slight spacing between letters for a clean look
          background: "linear-gradient(90deg, #00f260, #0575e6)", // Gradient text color
          WebkitBackgroundClip: "text", // Clips the gradient to the text
          WebkitTextFillColor: "transparent", // Makes sure only the gradient shows
        }}
      >
        Sign Up to Begin Your Adventure To Awesomeness
      </Typography>

      {/* Two Columns: Robot Image and Signup Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on small screens, side by side on medium+
          justifyContent: "center",
          alignItems: "center",
          gap: 4, // Space between the columns
          mb: 4
        }}
      >
        {/* Robot Image */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="robot.png"
            alt="Robot"
            style={{ width: "400px", height: "400px" }}
          />
        </Box>

        {/* Signup Form */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={0}
          margin={0}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "30px",
              boxShadow: "10px 10px 20px #000",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#1b263b",
              width: "100%", // Make the form take full width of the container
              maxWidth: "400px", // Limit the max width for better proportion
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                textAlign="center"
                padding={2}
                fontWeight={600}
                color="#fff"
              >
                Signup
              </Typography>
              <CustomizedInput type="text" name="name" label="Name" />
              <CustomizedInput type="email" name="email" label="Email" />
              <CustomizedInput type="password" name="password" label="Password" />
              <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                sx={{
                  px: 2,
                  py: 1,
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                  borderRadius: 2,
                  bgcolor: "#00fffc",
                  ":hover": {
                    bgcolor: "white",
                    color: "black",
                  },
                }}
                endIcon={<IoIosLogIn />}
              >
                Signup
              </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
