import { Carousel } from "@material-tailwind/react";

const ImgSlider = () => {
  return (
    <div>
      <Carousel
        loop={true}
        autoplay={true}
        navigation={false}
        prevArrow={null}
        nextArrow={null}
        id="slider_bx"
        className="rounded-xl z-50 h-[450px]"
      >
        <img
          src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="image 1"
          className="h-full w-full object-cover object-center rounded-tl-[100px] rounded-[15px]"
        />
        <img
          src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="image 2"
          className="h-full w-full object-cover object-center rounded-tl-[100px] rounded-[15px]"
        />
        <img
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="image 3"
          className="h-full w-full object-cover object-center rounded-tl-[100px] rounded-[15px]"
        />
      </Carousel>
    </div>
  );
};

export default ImgSlider;
