import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import Loader from 'src/components/loader';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import useAuth from '../service/useAuth';

const Profile = () => {
  const { mutate, userData, isLoadingUser, isError, logout } = useAuth();
  const navigateToProfile = useNavigate();
  useEffect(() => {
    const access = getCookie('access');

    if (access) {
      mutate();
    } else {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isError) {
    return <Loader />;
  }

  const handleNavigateToProfile = () => {
    navigateToProfile('/ProfilePage');
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center', marginBottom: 5, backgroundColor: '#ffffff' }}>
      <Box
        component="img"
        src="/assets/crowdlogo.png"
        alt="Logo"
        sx={{
          backgroundColor: '#ffffff',
          width: 150,
          height: 150,
          mx: 'auto',
          mb: 2,
        }}
      />
      <Box
        sx={{
          bgcolor: 'white',
          color: 'black',
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Grid item xs={12}>
          {!isLoadingUser ? (
            <Box display="flex" justifyContent="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {userData?.acc?.private_person[0]?.firstName}
              </Typography>
              <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                {userData?.acc?.private_person[0]?.lastName}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6">در حال بارگذاری...</Typography>
          )}
          <Button onClick={handleNavigateToProfile} variant="body1" sx={{ mt: 1, backgroundColor: '#ffffff' }}>
            خوش آمدید 👋
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
