import type { FC } from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import File04Icon from "@untitled-ui/icons-react/build/esm/File04";
import { Box, Button, Drawer, Stack, SvgIcon, TextField, Typography, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import Logo  from "src/components/logo";
import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scroll-bar"
import { usePathname } from "src/hooks/use-pathname";
import {Paths} from 'src/types/paths';
import type { NavColor } from "src/types/settings";
import { MobileNavSection } from "./mobile-nav-section";
import useSections, { DashboardSection } from "../configs";


const useCssVars = (color: NavColor): Record<string, string> => {
  const theme = useTheme();

  return useMemo((): Record<string, string> => {
    switch (color) {
      case "blend-in":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.background.default,
            "--nav-color": theme.palette.neutral[100],
            "--nav-border-color": theme.palette.neutral[700],
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[600],
            "--nav-item-icon-color": theme.palette.neutral[500],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[700],
            "--nav-item-chevron-color": theme.palette.neutral[700],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        } else {
          return {
            "--nav-bg": theme.palette.background.default,
            "--nav-color": theme.palette.text.primary,
            "--nav-border-color": theme.palette.neutral[100],
            "--nav-logo-border": theme.palette.neutral[100],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.text.secondary,
            "--nav-item-hover-bg": theme.palette.action.hover,
            "--nav-item-active-bg": theme.palette.action.selected,
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[400],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[400],
            "--nav-item-chevron-color": theme.palette.neutral[400],
            "--nav-scrollbar-color": theme.palette.neutral[900],
          };
        }

      case "discreet":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.neutral[900],
            "--nav-color": theme.palette.neutral[100],
            "--nav-border-color": theme.palette.neutral[700],
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[600],
            "--nav-item-icon-color": theme.palette.neutral[500],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[700],
            "--nav-item-chevron-color": theme.palette.neutral[700],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        } else {
          return {
            "--nav-bg": theme.palette.neutral[50],
            "--nav-color": theme.palette.text.primary,
            "--nav-border-color": theme.palette.divider,
            "--nav-logo-border": theme.palette.neutral[200],
            "--nav-section-title-color": theme.palette.neutral[500],
            "--nav-item-color": theme.palette.neutral[500],
            "--nav-item-hover-bg": theme.palette.action.hover,
            "--nav-item-active-bg": theme.palette.action.selected,
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[400],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[400],
            "--nav-item-chevron-color": theme.palette.neutral[400],
            "--nav-scrollbar-color": theme.palette.neutral[900],
          };
        }

      case "blue":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.neutral[800],
            "--nav-color": theme.palette.common.black,
            "--nav-border-color": "transparent",
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.common.white,
            "--nav-item-disabled-color": theme.palette.neutral[500],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[500],
            "--nav-item-chevron-color": theme.palette.neutral[600],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        } else {
          return {
            "--nav-bg": theme.palette.neutral[800],
            "--nav-color": theme.palette.common.white,
            "--nav-border-color": "transparent",
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.common.white,
            "--nav-item-disabled-color": theme.palette.neutral[500],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[500],
            "--nav-item-chevron-color": theme.palette.neutral[600],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        }
        case "black":
          if (theme.palette.mode === "dark") {
            return {
              "--nav-bg": theme.palette.neutral[800],
              "--nav-color": theme.palette.common.black,
              "--nav-border-color": "transparent",
              "--nav-logo-border": theme.palette.neutral[700],
              "--nav-section-title-color": theme.palette.neutral[400],
              "--nav-item-color": theme.palette.neutral[400],
              "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
              "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
              "--nav-item-active-color": theme.palette.common.white,
              "--nav-item-disabled-color": theme.palette.neutral[500],
              "--nav-item-icon-color": theme.palette.neutral[400],
              "--nav-item-icon-active-color": theme.palette.primary.main,
              "--nav-item-icon-disabled-color": theme.palette.neutral[500],
              "--nav-item-chevron-color": theme.palette.neutral[600],
              "--nav-scrollbar-color": theme.palette.neutral[400],
            };
          } else {
            return {
              "--nav-bg": theme.palette.neutral[600],
              "--nav-color": theme.palette.common.white,
              "--nav-border-color": "transparent",
              "--nav-logo-border": theme.palette.neutral[700],
              "--nav-section-title-color": theme.palette.neutral[400],
              "--nav-item-color": theme.palette.neutral[400],
              "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
              "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
              "--nav-item-active-color": theme.palette.common.white,
              "--nav-item-disabled-color": theme.palette.neutral[500],
              "--nav-item-icon-color": theme.palette.neutral[400],
              "--nav-item-icon-active-color": theme.palette.primary.main,
              "--nav-item-icon-disabled-color": theme.palette.neutral[500],
              "--nav-item-chevron-color": theme.palette.neutral[600],
              "--nav-scrollbar-color": theme.palette.neutral[400],
            };
          }

      default:
        return {};
    }
  }, [theme, color]);
};

interface MobileNavProps {
  color?: NavColor;
  onClose?: () => void;
  open?: boolean;
  sections?: DashboardSection[];
}

export const MobileNavCustomer: FC<MobileNavProps> = (props) => {
  const { color = "evident", open, onClose} = props;
  const pathname = usePathname();
  const cssVars = useCssVars(color);
  const sections = useSections()
  return (
    <Drawer 
        open 
        PaperProps={{
          sx: {
            ...cssVars,
            backgroundColor: "var(--nav-bg)",
            borderRightColor: "var(--nav-border-color)",
            borderRightStyle: "solid",
            borderRightWidth: 1,
            color: "var(--nav-color)",
            width: "50px",
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer - 2 }}
        variant="permanent"
    >
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
          "& .simplebar-scrollbar:before": {
            background: "var(--nav-scrollbar-color)",
          },
        }}
      >
        <Stack sx={{ height: "100%" }}>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1.5}
            sx={{ 
              py: 3,
              width: "100%",
            }}
          >
            <Box
              component={RouterLink}
              href={Paths.index}
              sx={{
                borderRadius: 1,
                display: "flex",
                height: 30,
                p: "4px",
                width: 40,
                alignItems: "center",
              }}
            >
              <img
                src="/images/logo.png"
                alt="logo"
                width="100%"
                height="100%"
                style={{ objectFit: "contain" }}
              />
              {/* <Typography>Hà Mã Con</Typography> */}
            </Box>
          </Stack>

          <Stack
            component="nav"
            spacing={2}
            sx={{
              flexGrow: 1,
              px: 2,
            }}
          >
            {sections.map((section, index) => (
              <MobileNavSection
                items={section.items}
                key={index}
                pathname={pathname}
                subheader = {section.subheader}
              />
            ))}
          </Stack>
        </Stack>
      </Scrollbar>
    </Drawer>
    );
};

MobileNavCustomer.propTypes = {
  color: PropTypes.oneOf<NavColor>(["blend-in", "discreet", "evident","blue","black"]),
  onClose: PropTypes.func,
  open: PropTypes.bool,
  sections: PropTypes.array,
};
