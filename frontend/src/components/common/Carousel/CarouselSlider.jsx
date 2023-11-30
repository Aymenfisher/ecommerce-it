import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './carouselStyles.css'


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1320 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 1320, min: 900 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 900, min: 0 },
        items: 2,
    },
    phone:{
        breakpoint: { max: 600, min: 0 },
        items: 1,
    }
};
const oneItemResponsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1200 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 1200, min: 900 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 900, min: 0 },
        items: 1,
    }
}

const CustomDot = ({ onClick,items, ...rest }) => {
    const {
        onMove,
        index,
        active,
        carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    return (
        <button
            className={active ? "active" : "inactive"}
            onClick={() => onClick()}
            style={{border: active ? '1px solid red':''}}
        >
            {items[index]}
        </button>
    );
};

const CarouselSlider = ({ items, showDots, oneItem, onClick }) => {
    return (
        <Carousel
            responsive={oneItem ? oneItemResponsive : responsive}
            itemClass="carousel-item"
            containerClass="carousel-container"
            showDots={showDots}
            customDot={<CustomDot items={items}/>}
            removeArrowOnDeviceType={oneItem ? 'tablet' : ''}
            renderDotsOutside={true}
        >
            {
                items.map((item, index) => {
                    return <div onClick={onClick} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', '&:hover': { border: '1px solid red', cursor: 'zoom-in' } }} key={index}>{item}</div>
                })
            }
        </Carousel >
    )
}

export default CarouselSlider
