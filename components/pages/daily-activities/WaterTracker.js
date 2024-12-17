import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { Grid } from '@mui/material';
import Card from '@mui/material/Card';

import WaterLevel from './WaterLevel';
import TargetChart from './TragetChart';
import History from './History';
import { addWater } from '../../../redux/daily-activities/DailyActivitiesActions';
import { getWeeklyData } from '../../../redux/dashboard/DashboardAction';

import '../../../styles/pages/daily-activities/WaterTracker.scss';

export default function WaterTracker() {

    // Weekly Data API
    useEffect(() => {
        dispatch(getWeeklyData("user/weeklyactivity", {}))
    }, []);

    const weeklyData = useSelector((store) => store.dashboard.weeklyData);
    const user = useSelector((store) => store.profile.user);
    const dispatch = useDispatch();

    const [waterLevel, setWaterLevel] = useState(0);
    const [history, setHistory] = useState([]);
    const [targetData, setTargetData] = useState([0,0,0,0,0,0,0]);

    useEffect(() => {
        if(weeklyData.length > 0) {
            let td = [];
            weeklyData.forEach(element => {
                td.push(Math.ceil(element.activity.water)); 
            });
    
            setTargetData(td);
            setWaterLevel((td[td.length - 1]))
        }
    }, [weeklyData]);

    useEffect(() => {
        setDrinkTimeState();
    }, [])

    const setDrinkTimeState = () => {
        if (localStorage.drinkTime) {
            setHistory(localStorage.drinkTime.split('|'))
        }
        else {
            setHistory([]);
        }
    };

    const saveToLocalStorage = () => {
        if (localStorage.drinkTime) {
            localStorage.drinkTime =
                `${new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) + " | "}` +
                localStorage.drinkTime
        } else {
            localStorage.drinkTime =
                new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })
        }
    };

    const handleClick = () => {
        setWaterLevel(waterLevel + 1);

        if (typeof Storage !== 'undefined') {
            saveToLocalStorage();
        } else {
            console.error('local storage not supported');
        }
        
        setDrinkTimeState();

        let day = new Date().getDay();
        const newTargetData = [...targetData];
        newTargetData[day] = (targetData[day] != undefined ? targetData[day] : 0) + 1;
        setTargetData(newTargetData);

        const body = {
            water: 1
        }
        dispatch(addWater("user/addwater", body));
    };

    // for history card height
    const [historyCardHeight, setHistoryCardHeight] = useState(0);
    useEffect(() => {
        let leftCard = document.querySelector("#leftCard");
        if (leftCard) {
            setHistoryCardHeight(leftCard.clientHeight);
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={3}
            >
                <Grid item xs={12} sm={6}>
                    <motion.div
                        whileHover={{ scale: 1.02, translateY: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Card 
                            id="leftCard" 
                            className="whiteBox waterCard"
                            sx={{
                                boxShadow: '0 8px 32px rgba(62, 152, 199, 0.2)',
                                borderRadius: '16px',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <WaterLevel waterLevel={waterLevel} goal={user.waterGoal} onClick={handleClick} />
                            <motion.div 
                                className='info-txt'
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Click on the circle to confirm that you have just drunk one glass of water
                            </motion.div>
                        </Card>
                    </motion.div>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <motion.div
                        whileHover={{ scale: 1.02, translateY: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Card 
                            className="whiteBox historyCard" 
                            sx={{ 
                                height: historyCardHeight,
                                boxShadow: '0 8px 32px rgba(62, 152, 199, 0.1)',
                                borderRadius: '16px',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <History time={history} tab="water" />
                        </Card>
                    </motion.div>
                </Grid>

                <Grid item xs={12}>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Card 
                            className="whiteBox targetCard"
                            sx={{
                                boxShadow: '0 8px 32px rgba(62, 152, 199, 0.15)',
                                borderRadius: '16px',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <TargetChart color="#3e98c7" data={targetData} goal={user.waterGoal} />
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </motion.div>
    );
}
