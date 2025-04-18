import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./page-title.scss";

const PageTitle = ({ roomName, roomLocation, roomLink, linkText }) => {
  const { t } = useTranslation();

  return (
    <div className="pt-6 relative">
      <div className="flex justify-center items-center">
        {/* room name */}
        <div className="flex flex-col gap-1.5 items-center">
          <h1 className="text-[#152C5B] font-semibold text-3xl">{roomName}</h1>
          <p className="text-[#B0B0B0] font-light">{roomLocation}</p>
        </div>
      </div>

      {/* page path */}
      <div className="path-bx flex gap-2.5 relative top-auto sm:top-auto md:top-9 lg:top-9 start-0 sm:relative md:absolute lg:absolute pt-2 sm:pt-2 md:pt-0 lg:pt-0">
        <Link
          to="/"
          className="text-[#B0B0B0]"
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          {t("home")}
        </Link>
        <span className="text-[#B0B0B0]">/</span>
        <Link to={roomLink} className="text-[#152C5B] font-medium">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default PageTitle;
