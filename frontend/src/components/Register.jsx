import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container, Paper, TextField, Button, Typography, Box,
  Alert, CircularProgress
} from "@mui/material";
import { UserContext } from "./UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!/\d/.test(password)) {
      setError("Password must contain at least one number");
      return;
    }

    setIsLoading(true);

    const result = await register(name, email, password);

    if (result.success) {
      // Redirect to onboarding to complete profile
      navigate("/onboarding");
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join SortAid to discover scholarships matched to your profile
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
            autoComplete="name"
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
            autoComplete="email"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
            autoComplete="new-password"
            helperText="At least 8 characters with one number"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Create Account"}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: '#1976d2' }}>
            Sign in
          </Link>
        </Typography>

        <Typography variant="caption" color="text.secondary" display="block" align="center">
          After registration, you'll complete a short profile questionnaire
          to get personalized scholarship recommendations.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
