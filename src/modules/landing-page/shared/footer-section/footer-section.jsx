import { useTranslation } from "react-i18next";
import Images from "../../../../assets/Images/Images";
import { Link } from "react-router-dom";
import "./footer-section.scss";

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <div
      id="footer_section"
      className="mt-8 pt-12 pb-5 border-t-[1px] border-t-[#E5E5E5]"
    >
      <div className="container_bx">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <img src={Images.colorLogo} alt="pic" />

            <p className="text-[#B0B0B0] mt-3 font-light">
              {t("footer.logo_sub")}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <h3 className="text-[#152C5B] text-lg font-semibold">
              {t("footer.for_beginners")}
            </h3>
            <div className="flex flex-col gap-2 mt-2">
              <Link className="text-[#B0B0B0] font-light w-fit" to="/">
                {t("footer.new_account")}
              </Link>
              <Link className="text-[#B0B0B0] font-light w-fit" to="/">
                {t("footer.start_booking_room")}
              </Link>
              <Link className="text-[#B0B0B0] font-light w-fit" to="/">
                {t("footer.use_payments")}
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <h3 className="text-[#152C5B] text-lg font-semibold">
              {t("footer.explore_us")}
            </h3>
            <div className="flex flex-col gap-2 mt-2">
              <Link className="text-[#B0B0B0] font-light w-fit" to="/">
                {t("footer.our_careers")}
              </Link>
              <Link className="text-[#B0B0B0] font-light w-fit" to="/">
                {t("footer.privacy")}
              </Link>
              <Link className="text-[#B0B0B0] font-light w-fit" to="/">
                {t("footer.terms_conditions")}
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-2">
            <h3 className="text-[#152C5B] text-lg font-semibold">
              {t("footer.connect_us")}
            </h3>
            <div className="flex flex-col gap-2 mt-2">
              <Link className="text-[#B0B0B0] font-light w-fit" to="/">
                support@staycation.id
              </Link>
              <Link className="text-[#B0B0B0] font-light w-fit" to="/">
                021 - 2208 - 1996
              </Link>
              <Link className="text-[#B0B0B0] font-light w-fit" to="/">
                {t("footer.location")}
              </Link>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="pt-16 pb-4 text-center text-[#B0B0B0] font-light text-sm">
          Copyright 2025 • All rights reserved • Staycation
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
