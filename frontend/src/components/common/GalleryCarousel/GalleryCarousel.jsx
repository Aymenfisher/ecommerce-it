import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

const GalleryCarousel = ({images,hasThumbnails,hasSizeButton,dots,hasIndexBoard}) => {

    return (
        <Carousel 
        images={images}  
        hasMediaButton={false}
        hasThumbnails={hasThumbnails}
        hasSizeButton={hasSizeButton}
        hasThumbnailsAtMax={false}
        style={{background: 'none',height:500,width:'100%'}}
        objectFit='contain'
        hasDotButtons={dots?'bottom':false}
        hasIndexBoard={hasIndexBoard}
        leftIcon={<ArrowCircleLeftRoundedIcon color='yellow' sx={{width:50,height:60}}/>}
        rightIcon={<ArrowCircleRightRoundedIcon color='yellow'   sx={{width:50,height:60}}/>}
        maxIcon={<ZoomOutMapIcon  sx={{width:40,height:40}}/>}
        />
    );
};

export default GalleryCarousel;