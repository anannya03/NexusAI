import { Box, Typography, Button, keyframes } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";

// Keyframe for the moving dotted streaks with smoother motion
const moveStreak = keyframes`
  0% {
    transform: translateY(-150%);
    opacity: 0;
  }
  30% {
    opacity: 0.6;
  }
  70% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(150%);
    opacity: 0;
  }
`;

const typing = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const blink = keyframes`
  0% {
    border-right-color: rgba(255, 255, 255, 0.75);
  }
  50% {
    border-right-color: transparent;
  }
  100% {
    border-right-color: rgba(255, 255, 255, 0.75);
  }
`;

const getRandomDelay = () => `${Math.random() * 3}s`;
const getRandomDuration = () => `${3 + Math.random() * 3}s`;

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = () => {
    navigate('/signup'); // Navigate to /signup when the button is clicked
  };
  
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      sx={{
        backgroundColor: "#0a0f2c", // Dark blue background matching the header
        backgroundImage: `
          radial-gradient(circle, rgba(13, 27, 42, 0) 0%, rgba(0, 0, 0, 0.8) 70%, #0a0f2c 100%),
          radial-gradient(circle, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
          linear-gradient(180deg, rgba(0, 0, 30, 0.8) 0%, rgba(0, 0, 15, 1) 100%)`,
        backgroundSize: "cover, 3px 3px, 100% 100%",
        backgroundPosition: "center center, center center, center center",
        color: "#f0f4f8",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Moving Dotted Streaks */}
      {[...Array(7)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: 0,
            left: `${10 + index * 12}%`,
            width: "2px", // Make the streaks thicker
            height: "25%", // Make the streaks taller
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.5) 2px, transparent 2px)`, // Increase the size of the dots
            backgroundSize: "3px 15px", // Reduce the spacing between dots
            backgroundRepeat: "repeat-y",
            animation: `${moveStreak} ${getRandomDuration()} linear infinite`,
            animationDelay: `${getRandomDelay()}`,
          }}
        />
      ))}

      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: "#ffffff",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
          mt: 5,
        }}
      >
        Nexus 1.0
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          color: "#00e5ff",
          mt: 2,
          whiteSpace: "nowrap", // Ensure text doesn't wrap to a new line
          overflow: "hidden", // Hide the overflow while typing effect is on
          // borderRight: "2px solid rgba(255, 255, 255, 0.75)", // Simulate a cursor
          animation: `${typing} 3s steps(30, end), ${blink} 0.75s step-end infinite alternate`,
          animationDelay: "1s", // Start typing after 1 second
          animationIterationCount: "infinite",
          animationDirection: "normal",
        }}
      >
        Your Very Own Learning Buddy
      </Typography>

      {/* Horizontal Cards for Characteristics */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 8,
          gap: 3,
          width: "80%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1b263b",
            borderRadius: "12px",
            padding: "20px",
            flex: 1,
            textAlign: "left",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s ease",
            '&:hover': {
              transform: "translateY(-10px)",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Typography variant="h5" color="#ffffff" gutterBottom>
            Smarter Than Your Average Bear 🐻
          </Typography>
          <Typography variant="body1" color="#bbb">
            Nexus is your AI sidekick, always ready with the smartest answers, making your learning journey effortless.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1b263b",
            borderRadius: "12px",
            padding: "20px",
            flex: 1,
            textAlign: "left",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s ease",
            '&:hover': {
              transform: "translateY(-10px)",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Typography variant="h5" color="#ffffff" gutterBottom>
            Instant Answers, Every Time ⚡️
          </Typography>
          <Typography variant="body1" color="#bbb">
            Never get stuck again! Nexus is there with instant answers, ensuring you’re always moving forward.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1b263b",
            borderRadius: "12px",
            padding: "20px",
            flex: 1,
            textAlign: "left",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s ease",
            '&:hover': {
              transform: "translateY(-10px)",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Typography variant="h5" color="#ffffff" gutterBottom>
            Quirky, Fun, & Always Engaging 🎉
          </Typography>
          <Typography variant="body1" color="#bbb">
            Learning doesn’t have to be boring! Nexus makes it fun with a quirky personality that keeps you engaged.
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: 10,
          backgroundColor: "#6a5acd",
          color: "#fff",
          '&:hover': {
            backgroundColor: "#5a4dbd",
          },
        }}
        onClick={handleButtonClick}
      >
        Get Started with Nexus
      </Button>

      <Footer />
    </Box>
  );
};

export default Home;
