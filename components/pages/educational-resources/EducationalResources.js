import React from "react";

import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { blogsList } from "../../Constants";
import '../../../styles/pages/EducationalResources.scss';

const BlogCard = (obj) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
    };

    const calculateRotation = () => {
        const rotateX = ((mousePosition.y / 150) - 1) * 10;
        const rotateY = ((mousePosition.x / 150) - 1) * 10;
        return `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    return (
        <Card 
            className="whiteBox blogCard" 
            elevation={3}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
            sx={{
                transform: mousePosition.x ? calculateRotation() : 'none',
                '&:hover': {
                    '&::before': {
                        opacity: 1
                    }
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                }
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div" className="title">
                    {obj.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="description">
                    {obj.description} ...
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small">
                    <Link href={obj.link} underline="none" target="_blank" rel="noopener">Read More</Link>
                </Button>
            </CardActions>
        </Card>
    );
}

const EducationalResources = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={3}
        >
            {blogsList.map((obj, index) => (
                <Grid item key={index} xs={12} sm={6}>
                    {BlogCard(obj)}    
                </Grid>
            ))}
        </Grid>
    );
}

export default EducationalResources;