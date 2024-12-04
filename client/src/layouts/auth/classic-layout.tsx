import {Stack,styled,Box, Container} from '@mui/material';
import {FC, ReactNode} from 'react';

interface LayoutProps {
    children: ReactNode;
}
const LayoutRoot = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    height: "100%",
  }));
export const Layout:FC<LayoutProps> = (props) => {
    const {children} = props;
    return (
        <LayoutRoot>
            <Box>
                {children}
            </Box>
        </LayoutRoot>
    );
}
