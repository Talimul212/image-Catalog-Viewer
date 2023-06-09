import { Button, Grid, Icon, IconButton, Paper } from "@material-ui/core";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
// Define your image data with a list of objects containing image URLs and details
const imageData = [
  {
    id: 1,
    src: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
    details:
      "An image is a visual representation of something. It can be two-dimensional, three-dimensional, or somehow otherwise feed into the visual system to convey information. An image can be an artifact, such as a photograph or other two-dimensional picture, that resembles a subject. In the context of signal processing, an image is a distributed amplitude of color(s)",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg",
    details:
      "An image does not have to use the entire visual system to be a visual representation. A popular example of this is of a greyscale image, which uses the visual system's sensitivity to brightness across all wavelengths, without taking into account different colors. A black and white visual representation of something is still an image, even though it does not make full use of the visual system's capabilities.",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/135940/pexels-photo-135940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details:
      "An image is a visual representation of something. It can be two-dimensional, three-dimensional, or somehow otherwise feed into the visual system to convey information. An image can be an artifact, such as a photograph or other two-dimensional picture, that resembles a subject. In the context of signal processing, an image is a distributed amplitude of color(s)",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    details:
      "An image does not have to use the entire visual system to be a visual representation. A popular example of this is of a greyscale image, which uses the visual system's sensitivity to brightness across all wavelengths, without taking into account different colors. A black and white visual representation of something is still an image, even though it does not make full use of the visual system's capabilities.",
  },
];

// Define the time interval for the automatic display of images
const AUTOPLAY_INTERVAL_MS = 2500;

// Define the component for a single image thumbnail
interface ThumbnailProps {
  id: number;
  src: string;
  details: string;
  selected: boolean;
  onClick: () => void;
}
const Thumbnail: React.FC<ThumbnailProps> = ({
  id,
  src,
  details,
  selected,
  onClick,
}) => {
  return (
    <Grid item xs={3}>
      <Paper
        onClick={onClick}
        style={{
          cursor: "pointer",
          filter: selected ? "none" : "grayscale(100%)",
        }}
      >
        <img src={src} alt={`Thumbnail ${id}`} height="200px" width="100%" />
      </Paper>
    </Grid>
  );
};

// Define the main component for the catalog viewer

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle automatic slideshow when autoplay is on
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % imageData.length);
      }, AUTOPLAY_INTERVAL_MS);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentIndex, isPlaying]);

  // // Handle the click event for a thumbnail
  const handleThumbnailClick = (index: number) => {
    console.log(index);
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  // Handle the click event for the previous button
  const handlePreviousClick = () => {
    setCurrentIndex((currentIndex - 1 + imageData.length) % imageData.length);
    setIsPlaying(false);
  };

  // Handle the click event for the next button
  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % imageData.length);
    setIsPlaying(false);
  };

  // Handle the click event for the play/pause button
  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Grid
      container
      spacing={2}
      style={{ paddingLeft: "30px", paddingRight: "30px", marginTop: "20px" }}
    >
      <Grid item xs={12} lg={8}>
        <Paper style={{ padding: "1rem" }}>
          <img
            src={imageData[currentIndex].src}
            alt={`Image ${currentIndex + 1}`}
            width="100%"
            height="400px"
          />
        </Paper>
      </Grid>
      <Grid item xs lg={4}>
        <Typography variant="h6" style={{ marginTop: "1rem" }}>
          {imageData[currentIndex].details}
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} lg={12} style={{ marginTop: "1rem" }}>
        <Grid container spacing={4}>
          <Grid item lg={1}   style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
           <div>
           <ArrowCircleLeftIcon
              onClick={handlePreviousClick}
              style={{ height: "50px", width: "50px",color:"#38bdf8" }}
            ></ArrowCircleLeftIcon>
           </div>
          </Grid>
          <Grid style={{ display: "flex", gap: "20px" }} lg={6}>
            {imageData.map((image, index) => (
              <Thumbnail
                key={image.id}
                id={image.id}
                src={image.src}
                details={image.details}
                selected={currentIndex === index}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </Grid>
          <Grid lg={1}             style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div>
            <ArrowCircleRightIcon
              onClick={handleNextClick}
              style={{ height: "50px", width: "50px",color:"#38bdf8" }}
            ></ArrowCircleRightIcon>
            </div>
          </Grid>
          <Grid
            lg={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              {isPlaying ? (
                <PauseCircleIcon
                  onClick={handlePlayPauseClick}
                  style={{
                    width: "100px",
                    height: "100px",
                    alignItems: "center",color:"#38bdf8"
                  }}
                ></PauseCircleIcon>
              ) : (
                <PlayCircleIcon
                  onClick={handlePlayPauseClick}
                  style={{ width: "100px", height: "100px",color:"#38bdf8" }}
                ></PlayCircleIcon>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
