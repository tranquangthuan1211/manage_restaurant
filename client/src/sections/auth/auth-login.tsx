import { Box, Button, IconButton, TextField, Typography } from "@mui/material"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
export const AuthLogin = () => {
    return (
        <Box
            sx={{
                // position: 'absolute',
                // top: '50%',
                // left: { xs: '50%', lg: 'calc(50% + 300px)' },
                // transform: 'translate(-50%, -50%)',
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
            <TextField
                label="Username"
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
            >
                Sign in
            </Button>
        </Box>
    )
}