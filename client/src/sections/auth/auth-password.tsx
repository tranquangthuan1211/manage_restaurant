import { Box, Button, Stack, TextField, Typography } from "@mui/material"

export const ConfirmPassword = () => {
    return (
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
                   User name
                </Typography>
                            
                <TextField
                    label="User name"
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
                        Password
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
                            Confirm password
                        </Typography>
                        <TextField
                            label="Confirm password"
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
                    >
                    Next
            </Button>
        </Box>
    )
}