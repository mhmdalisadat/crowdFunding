import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Loader from 'src/components/loader';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { formatNumber } from 'src/utils/formatNumbers';
import { Card, Grid, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useGetDashbord from './service/use-getDashbord';
import ProfitUser from './profitUser';

const Dashboard = () => {
  const { data: dashbord } = useGetDashbord();

  if (!dashbord) {
    return <Loader />;
  }

  const DashCards = [
    {
      title: 'تعداد طرح ها',
      value: dashbord['all plan'],
      icon: InsertDriveFileIcon,
      color: '#4a90e2', // Soft blue
    },
    {
      title: 'تعداد طرح های فعال',
      value: dashbord['active plan'],
      icon: AssignmentTurnedInIcon,
      color: '#e74c3c', // Soft red
    },
    {
      title: 'تعداد مشارکت فعال',
      value: dashbord['participant plan'],
      icon: PeopleIcon,
      color: '#27ae60', // Soft green
    },
    {
      title: 'مبلغ مشارکت کاربر',
      value: formatNumber(dashbord['total value']),
      icon: MonetizationOnIcon,
      color: '#2980b9', // Soft blue
    },
    {
      title: 'سود',
      value: `${dashbord['all rate of return']}%`,
      icon: TrendingUpIcon,
      color: '#f39c12', // Soft orange
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <Grid container spacing={2} justifyContent="left" sx={{  mb: 4 }}>
        {DashCards.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={4} key={index}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: '0.3s',
                  background: `linear-gradient(135deg, ${item.color}15, ${item.color}30)`,
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '240px', // عرض مشخص برای آیکون
                    height: '120px', // ارتفاع مشخص برای آیکون
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '4px', color: item.color }}>
                    {item.value}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: '500' }}>
                    {item.title}
                  </Typography>
                </Box>
                <motion.div whileHover={{ rotate: 20 }} transition={{ duration: 0.5 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    transition: 'none', 
                  }}
                >
                  <IconComponent style={{ fontSize: '2.5rem' }} />
                </Box>
                </motion.div>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box
        sx={{
          mt: 4,
          p: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          backgroundColor: 'white',
        }}
      >
        <ProfitUser dashbord={dashbord} />
      </Box>
    </div>
  );
};

export default Dashboard;
