import ImageCarousel from "./components/ImageCarousel";
import images from "./data";
const App = () => {
  return (
    <>
      <ImageCarousel images={images} />
    </>
  );
};

export default App;
