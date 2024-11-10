import { RouterLink } from 'src/routes/components';
import { alpha, Box, ListItemButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { usePathname } from 'src/routes/hooks';

export default function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: active ? 'primary.main' : 'black',
        textTransform: 'capitalize',
        fontWeight: active ? 'bold' : 'medium',
        bgcolor: active ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          color: active ? 'primary.main' : 'black',
        },
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Typography component="span">{item.title}</Typography>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
};
