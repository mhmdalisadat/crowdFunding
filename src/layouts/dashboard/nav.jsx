import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { usePathname } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import Contant from 'src/module/navbar/feature/contante';
import { NAV } from './config-layout';

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname, onCloseNav, openNav]);

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        bgcolor: 'gray.200',
        borderRadius: 2,
        position: 'relative',
      }}
    >
      {upLg ? (
        <Box
          sx={{
            backgroundColor: '#ffffff',
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            bgcolor: 'gray.200',
            color: 'black',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <Contant />
        </Box>
      ) : (
        <>
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 1201,
              padding: 1,
              borderRadius: '50%',
              '& .MuiSvgIcon-root': {
                fontSize: 36,
                color: 'text.primary',
              },
              bgcolor: 'white',
              '&:hover': {
                bgcolor: 'gray.300',
              },
            }}
          >
            {mobileMenuOpen ? (
              <CloseIcon sx={{ color: 'black' }} />
            ) : (
              <MenuIcon sx={{ color: 'black' }} />
            )}
          </IconButton>

          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            PaperProps={{
              sx: {
                width: NAV.WIDTH,
                bgcolor: 'gray.200',
                color: 'black',
                // boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease',
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                position: 'relative',
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                boxShadow: 4,
              },
            }}
          >
            <Contant />
          </Drawer>
        </>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};
