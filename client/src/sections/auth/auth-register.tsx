import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { ConfirmPassword } from "src/sections/auth/auth-password"
import {apiPost} from 'src/api/api-requests';

export const RegisterLogin = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [step, setStep] = useState<number>(1)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try{
            const response = await apiPost("/users/register", formData);
            if (response.error === 1) {
                console.log("Registration failed:", response.message);
                return;
            }
            if (response.error === 0) {
                console.log("Registration successful:", response.message);
                console.log("User data:", response.data);
                return;
            }
            console.log("Registration failed with unknown error");
        } catch (error) {
            console.log("Registration failed:", error);
        }
    };

    return (
        <Box
            sx={{

                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '10px',
                padding: '10px',
                width: { xs: '80%', sm: '400px' },
                color: 'white',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#FFD700' }}>Sign up</Typography>
                <IconButton color="inherit">
                    <CloseIcon />
                </IconButton>
            </Box>
            {step == 2 ? (
                // User name, Password & Confirm password
                <Box>
                    <Stack
                        spacing={1}
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFFF',
                                mb: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            User name
                        </Typography>

                        <TextField
                            label="User name"
                            variant="filled"
                            fullWidth
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            sx={{
                                mb: 2,
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                '& .MuiFilledInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        />
                    </Stack>
                    <Stack
                        spacing={1}
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFFF',
                                mb: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            Password
                        </Typography>
                        <TextField
                            label="Password"
                            variant="filled"
                            type="password"
                            fullWidth
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{
                                mb: 2,
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                '& .MuiFilledInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        />
                    </Stack>
                    <Stack
                        spacing={1}
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFFF',
                                mb: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            Confirm password
                        </Typography>
                        <TextField
                            label="Confirm password"
                            variant="filled"
                            type="password"
                            fullWidth
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            sx={{
                                mb: 2,
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                '& .MuiFilledInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        />
                    </Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}
                    >
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
                        onClick={() => setStep(1)}
                    >
                        Previous
                    </Button>
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
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                    </Box>

                    
                </Box>
            ) : (
                // Full name, Phone, Email & Address
                <Box>
                    <Stack
                        spacing={1}
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <Typography
                            variant="h6"

                            sx={{
                                color: '#FFFF',
                                mb: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            Full name
                        </Typography>

                        <TextField
                            label="Full name"
                            variant="filled"
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            sx={{
                                mb: 2,
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                '& .MuiFilledInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        />
                    </Stack>
                    <Stack
                        spacing={1}
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <Typography
                            variant="h6"

                            sx={{
                                color: '#FFFF',
                                mb: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            Phone
                        </Typography>

                        <TextField
                            label="Phone"
                            variant="filled"
                            fullWidth
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            sx={{
                                mb: 2,
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                '& .MuiFilledInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        />
                    </Stack>
                    <Stack
                        spacing={1}
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFFF',
                                mb: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            Email
                        </Typography>
                        <TextField
                            label="Email"
                            variant="filled"
                            type="email"
                            fullWidth
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{
                                mb: 2,
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                '& .MuiFilledInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        />
                    </Stack>
                    <Stack
                        spacing={1}
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFFF',
                                mb: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            Address
                        </Typography>
                        <TextField
                            label="Address"
                            variant="filled"
                            type="Address"
                            fullWidth
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            sx={{
                                mb: 2,
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                '& .MuiFilledInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        />
                    </Stack>
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
                        onClick={() => setStep(2)}
                    >
                        Next
                    </Button>
                </Box>
            )}

        </Box>
    )
}