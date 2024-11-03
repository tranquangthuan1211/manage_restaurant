import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import {ConfirmPassword} from "src/sections/auth/auth-password"
export const RegisterLogin = () => {
    const [next, setNext] = useState<boolean>(false)
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
            { next? (
                <ConfirmPassword />
            ): (
                <Box>
                    <Stack
                        spacing={1}
                        sx = {{
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
                            label="full name"
                            variant="filled"
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
                    </Stack>
                    <Stack
                        spacing={1}
                        sx = {{
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
                        sx = {{
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
                            label="Password"
                            variant="filled"
                            type="password"
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
                    </Stack>
                    <Stack
                        spacing={1}
                        sx = {{
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
                        onClick={() => setNext(true)}
                    >
                        Next
                    </Button>
                </Box>
            )}

        </Box>
    )
}