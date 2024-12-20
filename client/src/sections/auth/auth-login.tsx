import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "src/hooks/use-auth";
import { useMounted } from "src/hooks/use-mounted";
import { useRouter } from "next/router";
import useAppSnackbar from "src/hooks/use-app-snackbar";

interface Values {
  email: string;
  password: string;
  position: string;
  submit: null;
}

const initialValues: Values = {
  email: "",
  password: "",
  position: "doctor",
  submit: null,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Vui lòng nhập email hợp lệ").max(255).required("Email là bắt buộc"),
  password: Yup.string().max(255).required("Mật khẩu là bắt buộc"),
});

export const AuthLogin = () => {
  const { showSnackbarSuccess } = useAppSnackbar();
  const router = useRouter();
  const { signIn } = useAuth();
  const isMounted = useMounted();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const result = await signIn(values.email, values.password);
        if (result && isMounted()) {
          showSnackbarSuccess("Đăng nhập thành công");
          if (result.role === "admin") {
            router.push("/dashboard/statistical");
          }else if(result.role === "staff"){
            router.push("/staff/schedule");
          }
        }
      } catch (err) {
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        padding: '20px',
        width: { xs: '80%', sm: '400px' },
        color: 'white',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#FFD700' }}>Sign in</Typography>
        <IconButton color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Username"
          variant="filled"
          fullWidth
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            mb: 2,
            backgroundColor: 'white',
            borderRadius: '5px',
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: 'white',
            borderRadius: '5px',
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        />
        {formik.errors.submit && (
          <Typography color="error" variant="body2">{formik.errors.submit}</Typography>
        )}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#FFD700',
            color: 'black',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#FFC107',
            },
          }}
          type="submit"
        >
          Sign in
        </Button>
      </form>
    </Box>
  );
};
