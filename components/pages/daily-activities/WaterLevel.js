import React, { Component } from 'react';

import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import LiquidFillGauge from 'react-liquid-gauge';

class WaterLevel extends Component {
    startColor = '#3e98c7';
    endColor = '#80c5de';
    defaultGoal = 13;

    componentDidMount() {
        // Check if we need to reset on component mount
        this.checkAndResetDaily();
        
        // Set up daily check at midnight
        this.timer = setInterval(() => {
            this.checkAndResetDaily();
        }, 60000); // Check every minute
    }

    componentWillUnmount() {
        // Clean up timer
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    checkAndResetDaily = () => {
        const lastResetDate = localStorage.getItem('lastWaterResetDate');
        const today = new Date().toDateString();

        if (lastResetDate !== today) {
            // Reset water level to 0
            if (this.props.onReset) {
                this.props.onReset();
            }
            // Store new reset date
            localStorage.setItem('lastWaterResetDate', today);
        }
    }

    render() {
        const radius = 100;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const goal = this.props.goal || this.defaultGoal;
        const fillColor = interpolate(this.props.waterLevel / goal);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];

        return (
            <LiquidFillGauge
                style={{
                    margin: '0 auto', 
                    border: "0px solid white",
                    cursor: 'pointer'
                }}
                width={radius * 2}
                height={radius * 2}
                value={(this.props.waterLevel/goal)*100}
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                    const radius = Math.min(props.height / 2, props.width / 2);
                    const textPixels = (props.textSize * radius / 2);
                    const valueStyle = {
                        fontSize: textPixels
                    };
                    const percentStyle = {
                        fontSize: textPixels * 0.6
                    };

                    return (
                        <tspan>
                            <tspan className="value" style={valueStyle}>{this.props.waterLevel}</tspan>
                            <tspan style={percentStyle}>/{goal}</tspan>
                            <tspan>Glasses</tspan>
                        </tspan>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={1}
                gradient
                gradientStops={gradientStops}
                outerRadius={1}
                innerRadius={0.96}
                circleStyle={{
                    fill: "#3e98c7",
                }}
                waveStyle={{
                    fill: fillColor
                }}
                textStyle={{
                    fill: color('#444').toString(),
                    fontFamily: 'Arial'
                }}
                waveTextStyle={{
                    fill: color('#fff').toString(),
                    fontFamily: 'Arial'
                }}
                onClick={this.props.onClick}
            />
        );
    }
}
export default WaterLevel;