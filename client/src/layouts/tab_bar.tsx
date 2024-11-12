import {FC, ReactNode} from 'react';
import { Stack, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
interface TabBarProps {
    children: React.ReactNode;
}

export const TabBar: FC<TabBarProps> = ({children}) => {
    return (
        <Stack
            sx = {{
                flexGrow: 1,
                width: '100%',
                minHeight: '100vh',
                zIndex: 1,
            }}
        >
            <AppBar position="static" sx = {{
                backgroundColor: 'black',
                zIndex: 2,
            }}>
                <Toolbar>
                    <Box component="img" src="/images/logo.png" sx={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                        Baby Hippo Restaurant
                    </Typography>
                    <Button color="inherit" href="/">Home</Button>
                    <Button color="inherit" href="/about">About</Button>
                    <Button color="inherit" href="/auth">Sign In & Sign Up</Button>

                </Toolbar>
            </AppBar>
            {children}
        </Stack>
    );
}