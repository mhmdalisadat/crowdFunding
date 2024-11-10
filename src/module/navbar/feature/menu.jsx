import { Stack, ListItemButton, alpha, Box } from '@mui/material';
import SvgColor from 'src/services/svg-color';
import useExist from 'src/hooks/useLogOut';
import navConfig from '../config/config-navigation';
import NavItem from './navItem';

const Menu = () => {
  const { mutate } = useExist();

  const handleLogOut = () => {
    mutate();
  };

  return (
    <Stack component="nav" spacing={0.5} sx={{ px: 2, backgroundColor: '#ffffff' }}>
      {navConfig.map((item) => (
        <NavItem sx={{ px: 2, backgroundColor: '#ffffff' }} key={item.title} item={item} />
      ))}
      <ListItemButton
        onClick={() => handleLogOut()}
        sx={{
          backgroundColor: '#ffffff',
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'red',
          textTransform: 'capitalize',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            color: (theme) => theme.palette.error.main,
          },
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          <SvgColor
            src="/assets/icons/navbar/ic_exit.svg"
            sx={{ width: 1, height: 1, color: 'red' }}
          />
        </Box>
        <Box component="span">خروج</Box>
      </ListItemButton>
    </Stack>
  );
};

export default Menu;
