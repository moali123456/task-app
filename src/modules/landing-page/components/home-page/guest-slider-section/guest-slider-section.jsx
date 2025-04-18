import { useTranslation } from "react-i18next";
import { Carousel, IconButton } from "@material-tailwind/react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import Images from "../../../../../assets/Images/Images";
import "./guest-slider-section.scss";

const GuestSliderSection = () => {
  const { t } = useTranslation();

  return (
    <div id="guestSlider_section">
      <div className="container_bx pt-8 pb-12">
        <Carousel
          className=""
          navigation={false}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="amber-900"
              size="lg"
              onClick={handlePrev}
              className="!absolute -translate-y-2/4 cursor-pointer prev-btn"
            >
              <img
                className="w-10 h-10"
                src={Images.arrow_circle_left}
                alt="pic"
              />
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="amber-900"
              size="lg"
              onClick={handleNext}
              className="!absolute -translate-y-2/4 cursor-pointer next-ptn"
            >
              <img
                className="w-10 h-10"
                src={Images.arrow_circle_left}
                alt="pic"
              />
            </IconButton>
          )}
        >
          <div className="relative h-full w-full pb-8">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                    alt="image 1"
                    className="h-[420px] w-full object-cover"
                  />
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-7 pt-12">
                <h1 className="text-[#152C5B] text-2xl font-semibold mb-3">
                  Happy Family
                </h1>

                <div className="flex gap-1 mt-8 mb-3">
                  <StarSolid className="w-6 h-6 text-yellow-500" />
                  <StarSolid className="w-6 h-6 text-yellow-500" />
                  <StarSolid className="w-6 h-6 text-yellow-500" />
                  <StarSolid className="w-6 h-6 text-yellow-500" />
                  <StarOutline className="w-6 h-6 text-yellow-500" />
                </div>

                <p className="text-[#152C5B] text-xl font-normal mb-2.5 line-clamp-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                  excepturi voluptatum voluptates voluptate vitae dignissimos
                  sunt facilis esse molestiae nisi, aspernatur rem, praesentium
                  saepe cupiditate ad repellendus voluptas reiciendis iure.
                </p>
                <p className="text-[#B0B0B0] font-light">
                  Angga, Product Designer
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-full w-full pb-8">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                    alt="image 1"
                    className="h-[420px] w-full object-cover"
                  />
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-7 pt-12">
                <h1 className="text-[#152C5B] text-2xl font-semibold mb-3">
                  Happy Family
                </h1>

                <div className="flex gap-1 mt-8 mb-3">
                  <StarSolid className="w-6 h-6 text-yellow-500" />
                  <StarSolid className="w-6 h-6 text-yellow-500" />
                  <StarSolid className="w-6 h-6 text-yellow-500" />
                  <StarSolid className="w-6 h-6 text-yellow-500" />
                  <StarOutline className="w-6 h-6 text-yellow-500" />
                </div>

                <p className="text-[#152C5B] text-xl font-normal mb-2.5 line-clamp-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                  excepturi voluptatum voluptates voluptate vitae dignissimos
                  sunt facilis esse molestiae nisi, aspernatur rem, praesentium
                  saepe cupiditate ad repellendus voluptas reiciendis iure.
                </p>
                <p className="text-[#B0B0B0] font-light">
                  Angga, Product Designer
                </p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default GuestSliderSection;
