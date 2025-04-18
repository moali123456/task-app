import "./page-banner.scss";

const PageBanner = ({ className, bannerTitle, bannerSubTitle }) => {
  return (
    <div id="page_banner" className={`${className}`}>
      <div className="rounded-[8px] py-[10px] px-[10px] bg-[#4d4d4d]/[0.4]">
        <h1>{bannerTitle}</h1>
        <p>{bannerSubTitle}</p>
      </div>
    </div>
  );
};

export default PageBanner;
