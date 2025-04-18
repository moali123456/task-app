import BannerSection from "./banner-section/banner-section";
import PopularSection from "./popular-section/popular-section";
import HousesSection from "./houses-section/houses-section";
import HotelsSection from "./hotels-section/hotels-section";
import AdsSection from "./ads-section/ads-section";
import GuestSliderSection from "./guest-slider-section/guest-slider-section";
import "./home-page.scss";

const HomePage = () => {
  return (
    <div id="home_page">
      {/* banner section */}
      <BannerSection />

      {/* popular section */}
      <PopularSection />

      {/* houses section */}
      <HousesSection />

      {/* hotels section */}
      <HotelsSection />

      {/* ads section */}
      <AdsSection />

      {/* guset slider section */}
      <GuestSliderSection />
    </div>
  );
};

export default HomePage;
