import { TextField, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidationSchema } from "../schemas/validationSchemas"; // Adjust the import path if necessary
import { Link, useNavigate } from "react-router-dom";
import { SignUpDto } from "../shared/dtos/signUpDto";
import apiService from "../services/api.service";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (payload: SignUpDto) => {
    await apiService.signUp(payload);
    navigate("/signin");
  };

  return (
    <Container>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              onBlur={field.onChange}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              onBlur={field.onChange}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              onBlur={field.onChange}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          disabled={!isValid}
        >
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: "16px" }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </Typography>
    </Container>
  );
};

export default SignUp;
