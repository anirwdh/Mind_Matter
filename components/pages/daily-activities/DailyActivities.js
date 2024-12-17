import React, { useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassWater, faDumbbell } from '@fortawesome/free-solid-svg-icons'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

import WaterTracker from './WaterTracker';
import ExerciseTracker from './ExerciseTracker';
import MeditationTracker from './MeditationTracker';

import '../../../styles/pages/daily-activities/DailyActivities.scss';
import 'react-circular-progressbar/dist/styles.css';

export default function DailyActivities() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <Box className="dailyActivities" sx={{
            padding: '20px',
            background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
            borderRadius: '20px',
            boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
        }}>
            <Tabs 
                value={tabIndex} 
                onChange={handleTabChange} 
                variant="fullWidth"
                sx={{
                    '& .MuiTab-root': {
                        borderRadius: '15px',
                        margin: '0 8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        },
                    },
                    '& .Mui-selected': {
                        background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
                        boxShadow: 'inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff',
                    }
                }}
            >
                <Tab label="Meditation Tracker" icon={<SelfImprovementIcon />} />
                <Tab label="Water Tracker" icon={<FontAwesomeIcon icon={faGlassWater} />} />
                <Tab label="Excercise Tracker" icon={<FontAwesomeIcon icon={faDumbbell} />} />
            </Tabs>

            <Box sx={{ 
                mt: 3,
                p: 3,
                background: '#ffffff',
                borderRadius: '15px',
                boxShadow: 'inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff',
            }}>
                {tabIndex === 0 && (<MeditationTracker />)}
                {tabIndex === 1 && (<WaterTracker />)}
                {tabIndex === 2 && (<ExerciseTracker />)}
            </Box>
        </Box>
    );
}