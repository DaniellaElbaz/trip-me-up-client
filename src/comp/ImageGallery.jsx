import React, { useState } from 'react';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

export default function ImageGallery({imageReferences}){
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

    return(
        <Box className="flex justify-center items-center" style={{ width: "70%" }}>
            <div className="relative w-1/2 "> {/* imag 50% from the left size*/}
                <img
                    src={imageReferences[currentImageIndex]}
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

