import { useTranslation } from "react-i18next";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";

const MainPagination = ({ setCurrentPage, currentPage, totalPages }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex items-center gap-4 justify-center mb-10 mt-10">
      <Button
        variant="text"
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon
          strokeWidth={2}
          className="h-4 w-4"
          style={{
            transform: i18n.language === "ar" ? "rotate(180deg)" : "",
          }}
        />{" "}
        {t("previous")}
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <IconButton
            key={page}
            variant={currentPage === page ? "filled" : "text"}
            color="gray"
            className={`cursor-pointer ${
              currentPage === page ? "bg-[#3252DF]" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </IconButton>
        ))}
      </div>

      <Button
        variant="text"
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        {t("next")}{" "}
        <ArrowRightIcon
          strokeWidth={2}
          className="h-4 w-4"
          style={{
            transform: i18n.language === "ar" ? "rotate(180deg)" : "",
          }}
        />
      </Button>
    </div>
  );
};

export default MainPagination;
