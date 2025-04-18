import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Datepicker from "react-tailwindcss-datepicker";
import {
  Input,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const Booking = ({
  buttonText,
  price,
  discount,
  payment,
  btnClass,
  //btnLink,
  roomId,
  onBookingSubmit,
}) => {
  const { t } = useTranslation();
  const [numberValue, setNumberValue] = useState(0);
  const [numPersons, setNumPersons] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price || 0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(price || 0);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if form was submitted

  const {
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const handelBookSubmit = async () => {
    setFormSubmitted(true); // Mark form as submitted

    if (!value.startDate || !value.endDate || numberValue <= 0) {
      return; // Stop submission if validation fails
    }

    // Format dates to "YYYY-MM-DD"
    const formattedStartDate = new Date(value.startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(value.endDate).toISOString().split("T")[0];

    const bookingData = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      roomId,
      totalPrice: totalDiscountPrice,
    };

    // Call the onBookingSubmit function passed from the parent component
    if (onBookingSubmit) {
      onBookingSubmit(bookingData);
    }

    // navigate(btnLink || "/explore-rooms");
    // navigate(btnLink);
    // console.log(bookingData);
  };

  useEffect(() => {
    setNumPersons(numberValue);
    setTotalPrice(numberValue * price);
    setTotalDiscountPrice(numberValue * (price - (price * discount) / 100));
  }, [numberValue, price, discount]);

  return (
    <div>
      {/*  */}
      <form onSubmit={handleSubmit(handelBookSubmit)} autoComplete="off">
        <div className="date_bx mt-1">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-medium text-[#152C5B] top-"
          >
            {t("home_page.pick_date")}
          </Typography>
          <Datepicker
            displayFormat="DD/MM/YYYY"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            toggleClassName="!absolute start-1 top-1 h-[32px] w-[55px] text-white rounded cursor-pointer bg-[#152C5B] flex justify-center items-center"
          />
        </div>
        {/* Show error only if form has been submitted */}
        {formSubmitted && (!value.startDate || !value.endDate) && (
          <p className="text-red-500 text-sm mt-1">
            Please select a valid date range.
          </p>
        )}
        {/*  */}

        {/*  */}
        <div className="w-full mt-1.5">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-medium text-[#152C5B]"
          >
            Select Amount
          </Typography>
          <div className="relative w-full">
            <Input
              type="number"
              value={numberValue}
              onChange={(e) => setNumberValue(Number(e.target.value))}
              className="!border !border-transparent !bg-[#F5F6F8] ps-9 pe-9 text-center text-gray-900 placeholder:text-gray-500 focus:!border-gray-900 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "min-w-0",
              }}
            />
            <div className="absolute start-1 top-1">
              <IconButton
                size="sm"
                className="rounded bg-[#E74C3C]"
                onClick={() =>
                  setNumberValue((cur) => (cur === 0 ? 0 : cur - 1))
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                </svg>
              </IconButton>
            </div>

            <div className="absolute end-1 top-1">
              <IconButton
                size="sm"
                className="rounded bg-[#1ABC9C]"
                onClick={() => setNumberValue((cur) => cur + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                </svg>
              </IconButton>
            </div>
          </div>
          {/*  */}
          {/* Show error only if form has been submitted */}
          {formSubmitted && numberValue <= 0 && (
            <p className="text-red-500 text-sm mt-1">
              Please select at least one person.
            </p>
          )}
          {/*  */}

          {/* Show Payment Section Conditionally */}
          {payment && (
            <>
              <p className="text-[#B0B0B0] text-sm font-light mt-4">
                {t("you_will_pay")}
                <span className="text-[#152C5B] font-medium">
                  ${totalPrice} USD
                </span>{" "}
                {t("per")} {""}
                <span className="text-[#152C5B] font-medium">
                  {numberValue} {t("person")}
                </span>{" "}
                <br />
              </p>

              <div className="text-[#FF1612] mt-5 text-center font-medium">
                after discount ${totalDiscountPrice}
              </div>
            </>
          )}

          <div className={btnClass}>
            <Button
              variant="filled"
              type="submit"
              className="mt-7 bg-[#3252DF] cursor-pointer capitalize font-normal text-base py-2 px-10"
            >
              {buttonText}
              {/* <Link to={btnLink}>{buttonText}</Link> */}
            </Button>
          </div>
        </div>
      </form>
      {/*  */}
    </div>
  );
};

export default Booking;
