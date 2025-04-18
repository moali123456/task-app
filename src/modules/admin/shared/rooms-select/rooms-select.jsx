// import { useEffect, useState } from "react";
// import Select from "react-select";
// import { Controller } from "react-hook-form";
// import axios from "axios";
// import { ROOMS_ADMIN_URLS } from "../../../../constants/ADMIN_END_POINTS";

// const RoomsSelect = ({ control, errors, t }) => {
//   const [roomsList, setRoomsList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

//   // Fetch facilities when component mounts
//   useEffect(() => {
//     const getRoomsList = async () => {
//       try {
//         const response = await axios.get(
//           ROOMS_ADMIN_URLS.getAll,
//           {
//             headers: {
//               Authorization: `${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setRoomsList(response.data?.data?.rooms || []);
//       } catch (error) {
//         console.error("Error fetching rooms:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getRoomsList();
//   }, []);

//   const options = roomsList?.map((room) => ({
//     label: room.roomNumber,
//     value: room._id,
//   }));

//   return (
//     <div className="mt-2">
//       <Controller
//         name="room"
//         control={control}
//         rules={{ required: t("facilities_required") }}
//         render={({ field }) => {
//           const selectedValues =
//             !isLoading && Array.isArray(field.value)
//               ? options.filter((option) => field.value.includes(option.value))
//               : [];

//           return (
//             <Select
//               {...field}
//               value={selectedValues}
//               onChange={(selectedOptions) =>
//                 // Map over the selected options and set their values in the form field
//                 field.onChange(
//                   selectedOptions
//                     ? selectedOptions.map((option) => option.value)
//                     : []
//                 )
//               }
//               options={options}
//               className="basic-single rooms_select"
//               classNamePrefix="select"
//               isMulti
//               isClearable
//               isLoading={isLoading}
//               placeholder={t("select_facilities")}
//             />
//           );
//         }}
//       />
//       {errors.room && (
//         <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
//           {errors.room.message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default RoomsSelect;

import { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import axios from "axios";
import { ROOMS_ADMIN_URLS } from "../../../../constants/ADMIN_END_POINTS";

const RoomsSelect = ({ control, errors, t }) => {
  const [roomsList, setRoomsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 300;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

  useEffect(() => {
    const getRoomsList = async (page) => {
      try {
        const response = await axios.get(`${ROOMS_ADMIN_URLS.getAll}?page=${page}&size=${itemsPerPage}`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
        setRoomsList(response.data?.data?.rooms || []);
        setTotalCount(response.data?.data?.totalCount || 0);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRoomsList(currentPage);
  }, [currentPage]);

  const options = roomsList?.map((room) => ({
    label: room.roomNumber,
    value: room._id,
  }));

  return (
    <div className="mt-2">
      <Controller
        name="room"
        control={control}
        rules={{ required: t("room_num_required") }}
        render={({ field }) => {
          const selectedValue = options.find(
            (option) => option.value === field.value
          );

          return (
            <Select
              {...field}
              value={selectedValue || null}
              onChange={(selectedOption) =>
                field.onChange(selectedOption ? selectedOption.value : "")
              }
              options={options}
              className="basic-single rooms_select"
              classNamePrefix="select"
              isClearable
              isLoading={isLoading}
              placeholder={t("select_room")}
            />
          );
        }}
      />
      {errors.room && (
        <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
          {errors.room.message}
        </p>
      )}
    </div>
  );
};

export default RoomsSelect;
