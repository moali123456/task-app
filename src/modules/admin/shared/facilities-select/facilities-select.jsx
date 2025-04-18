import { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import axios from "axios";
import { ROOMS_FACILITIES_ADMIN_URLS } from "../../../../constants/END_POINTS";

const FacilitiesSelect = ({ control, errors, t }) => {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

  // Fetch facilities when component mounts
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          ROOMS_FACILITIES_ADMIN_URLS.getAllFacilities,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setFacilities(response.data.data.facilities);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const options = facilities.map((facility) => ({
    label: facility.name,
    value: facility._id,
  }));

  return (
    <div className="mt-2">
      <Controller
        name="facilities"
        control={control}
        rules={{ required: t("facilities_required") }}
        render={({ field }) => {
          // Ensure field.value is an array (even if it's undefined)
          // const selectedValues = Array.isArray(field.value)
          //   ? options.filter((option) => field.value.includes(option.value))
          //   : [];
          const selectedValues =
            !isLoading && Array.isArray(field.value)
              ? options.filter((option) => field.value.includes(option.value))
              : [];

          return (
            <Select
              {...field}
              value={selectedValues}
              onChange={(selectedOptions) =>
                // Map over the selected options and set their values in the form field
                field.onChange(
                  selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : []
                )
              }
              options={options}
              className="basic-single facilities_select"
              classNamePrefix="select"
              isMulti
              isClearable
              isLoading={isLoading}
              placeholder={t("select_facilities")}
            />
          );
        }}
      />
      {errors.facilities && (
        <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
          {errors.facilities.message}
        </p>
      )}
    </div>
  );
};

export default FacilitiesSelect;
