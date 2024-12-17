import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { statsList } from "../../Constants";
import { formatDate, getStartMilliSecond } from '../../Helper';

const StatCard = (obj, dailyData, activeStat, setActiveStat) => {
  const handleCardClick = () => {
    setActiveStat(obj)
  }
  
  return (
    <Card 
      variant="outlined" 
      onClick={handleCardClick} 
      sx={{
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2.5,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        borderWidth: 2,
        borderColor: activeStat.key === obj.key ? obj.color : 'transparent',
        background: activeStat.key === obj.key 
          ? `linear-gradient(135deg, ${obj.color}15, ${obj.color}05)`
          : 'background.paper',
        backdropFilter: 'blur(8px)',
        transform: activeStat.key === obj.key ? 'scale(1.02)' : 'scale(1)',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          background: `linear-gradient(135deg, ${obj.color}10, transparent)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: theme => `
            0 14px 28px ${obj.color}15,
            0 10px 10px ${obj.color}10,
            0 0 120px ${obj.color}10
          `,
          borderColor: obj.color,
          '&:before': {
            opacity: 1,
          }
        }
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${obj.color}25, ${obj.color}15)`,
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            background: `linear-gradient(135deg, ${obj.color}50, transparent)`,
            borderRadius: 'inherit',
            filter: 'blur(8px)',
            opacity: 0.4,
            zIndex: -1,
          },
          svg: {
            color: obj.color,
            fontSize: '2rem',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }
        }}
      >
        {obj.icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 0.5,
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {obj.title}
        </Typography>
        <Typography 
          variant="h5" 
          fontWeight="bold"
          sx={{ 
            color: activeStat.key === obj.key ? obj.color : 'text.primary',
            transition: 'all 0.3s ease',
            textShadow: activeStat.key === obj.key 
              ? `0 2px 10px ${obj.color}40`
              : 'none',
            fontSize: '1.75rem',
            letterSpacing: '-0.5px'
          }}
        >
          {dailyData[obj.key]}
        </Typography>
      </Box>
    </Card>
  );
}

const DailyStats = (props) => {
  const { activeStat, setActiveStat } = props;
  const dashboard = useSelector((store) => store.dashboard);

  const [dailyData, setDailyData] = useState(
    {
      stepsCount: 0,
      heartPoints: 0,
      caloriesBurned: 0,
      hydrationRate: 0,
      exerciseDuration: 0,
      meditationTime: 0,
      mood: 'Neutral'
    }
  );

  const getStat = (val, time) => {
    var result = dashboard[val].filter((obj) => obj.startTimeMillis == time);

    if (result.length > 0) {
      result = result[0].dataset[0].point;
      return result.length ? result[0].value[0] : 0;
    }

    return 0;
  }

  useEffect(() => {
    const date = formatDate(new Date());
    const todayTime = getStartMilliSecond(date);

    if (dashboard.weeklyStepsCount.length > 0) {
      const stat = getStat("weeklyStepsCount", todayTime)
      setDailyData((prev) => ({
        ...prev,
        stepsCount: stat ? stat.intVal : 0,
      }))
    }

    if (dashboard.weeklyHeartPoints.length > 0) {
      const stat = getStat("weeklyHeartPoints", todayTime)
      setDailyData((prev) => ({
        ...prev,
        heartPoints: stat ? Math.ceil(stat.fpVal) : 0,
      }))
    }

    if (dashboard.weeklyCaloriesBurned.length > 0) {
      const stat = getStat("weeklyCaloriesBurned", todayTime)
      setDailyData((prev) => ({
        ...prev,
        caloriesBurned: stat ? Math.ceil(stat.fpVal) : 0,
      }))
    }

    let data = dashboard.weeklyData;
    if(data.length > 0) {
      setDailyData((prev) => ({
        ...prev,
        hydrationRate: data[data.length - 1].activity.water,
        exerciseDuration: data[data.length - 1].activity.exercise,
        meditationTime: data[data.length - 1].activity.meditation,
        mood: (data[data.length - 1].activity.mood === 1 ? "Sad" : (data[data.length - 1].activity.mood === 3 ? "Happy" : "Neutral")),
      }))
    }
  }, [dashboard]);

  return (
    <Grid
      container
      spacing={3}
      sx={{ 
        p: 3,
        background: theme => `
          radial-gradient(circle at top left, ${activeStat.color}15, transparent 40%),
          radial-gradient(circle at bottom right, ${activeStat.color}10, transparent 40%),
          linear-gradient(135deg, ${theme.palette.background.paper}, ${activeStat.color}08)
        `,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: 4,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `
            radial-gradient(circle, transparent 30%, ${activeStat.color}05 70%)
          `,
          opacity: 0.8,
          animation: 'pulseGradient 15s ease infinite',
        },
        '@keyframes pulseGradient': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-10%, -10%) scale(1.1)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, ${activeStat.color}10, transparent)`,
          opacity: 0.5,
          filter: 'blur(30px)',
          transform: 'translateZ(-10px)',
          pointerEvents: 'none',
        },
        boxShadow: theme => `
          0 0 80px ${activeStat.color}10 inset,
          0 2px 10px rgba(0,0,0,0.1)
        `,
        backdropFilter: 'blur(10px)',
      }}
    >
      {statsList.map((obj) => (
        <Grid 
          item 
          key={`daily-stat-${obj.key}`} 
          xs={12} sm={6} md={4} lg={3}
          sx={{
            transform: 'translateZ(0)',
            transition: 'transform 0.3s ease',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {StatCard(obj, dailyData, activeStat, setActiveStat)}
        </Grid>
      ))}
    </Grid>
  );
}

export default DailyStats;