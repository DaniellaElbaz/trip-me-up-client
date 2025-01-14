import React, { useEffect, useState } from 'react';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function ImageGallery(imageReferences){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNext = () => {
        setCurrentImageIndex((prev) =>
            prev < imageReferences.length - 1 ? prev + 1 : 0
        );
    };
    
    const handlePrev = () => {
        setCurrentImageIndex((prev) =>
            prev > 0 ? prev - 1 : imageReferences.length - 1
        );
    };

    const [photoUrls, setPhotoUrls] = useState([]);

    const fetchPlacePhotos = () => {
        console.log(imageReferences);
        const urls = imageReferences.imageReferences.map((reference) => 
            {return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${reference.photo_reference}&key=${API_KEY}`;}
            );
        setPhotoUrls(urls);
        console.log(urls);
    };

    useEffect(() => {
        if(imageReferences != null){
            fetchPlacePhotos();
        }
    }, [imageReferences]);

    return(
        <Box className="flex justify-center items-center" style={{ width: "70%" }}>
            <div className="relative w-1/2 "> {/* imag 50% from the left size*/}
                <img
                    src={photoUrls[currentImageIndex]}
                    alt={`image index ${currentImageIndex}`}
                    className="w-full h-full rounded-lg shadow-md object-cover"
                />
                <IconButton
                    onClick={handlePrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white hover:bg-blue-600 p-3"
                >
                    <ArrowBack />
                </IconButton>
                <IconButton
                    onClick={handleNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white hover:bg-blue-600 p-3"
                >
                    <ArrowForward />
                </IconButton>
            </div>
        </Box>
    ); 
}

