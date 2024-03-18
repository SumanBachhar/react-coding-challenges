import { useState } from "react";

function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="image-carousel">
      <div className="carousel-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className={index === currentImageIndex ? "active" : ""}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <button className="prev-button" onClick={goToPrevious}>
        Previous
      </button>
      <button className="next-button" onClick={goToNext}>
        Next
      </button>
    </div>
  );
}

export default ImageCarousel;
