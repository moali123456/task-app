// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import PageTitle from "../../shared/page-title/page-title";
// import ItemCard from "../../shared/item-card/item-card";
// import Images from "../../../../assets/Images/Images";
// import { Button, IconButton } from "@material-tailwind/react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
// import SkeletonOne from "../../shared/skeleton/skeleton-one";
// import { getAllRooms } from "../../../../networking/rooms.services";
// import "./explore-page.scss";

// const ExplorePage = () => {
//   const { t } = useTranslation();
//   const [roomsList, setRoomsList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
//   // pagination
//   const [active, setActive] = useState(1);

//   const getItemProps = (index) => ({
//     variant: active === index ? "filled" : "text",
//     color: "gray",
//     onClick: () => setActive(index),
//   });

//   const next = () => {
//     if (active === 5) return;

//     setActive(active + 1);
//   };

//   const prev = () => {
//     if (active === 1) return;

//     setActive(active - 1);
//   };

//   async function getRoomsList(page) {
//     try {
//       setLoading(true);
//       const response = await getAllRooms(page, itemsPerPage);
//       setRoomsList(response.data?.data?.rooms || []);
//       setTotalCount(response.data?.data?.totalCount || 0);
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getRoomsList(currentPage);
//   }, [currentPage]);

//   return (
//     <div id="explore_page">
//       <div className="container_bx">
//         {/* page title */}
//         <PageTitle
//           roomName={t("explore_all_rooms")}
//           //roomLocation="Bogor, Indonesia"
//           roomLink="/explore-rooms"
//           linkText={t("explore")}
//         />

//         <h1 className="text-[#152C5B] text-[21px] font-semibold mt-8">
//           {t("all_rooms")}
//         </h1>

//         {loading ? (
//           <SkeletonOne />
//         ) : (
//           <>
//             <div className="grid grid-cols-12 gap-4 mt-5">
//               {roomsList.length > 0
//                 ? roomsList.map((room, index) => (
//                     <div
//                       key={index}
//                       className="col-span-12 md:col-span-6 lg:col-span-3 mb-5"
//                     >
//                       <ItemCard
//                         cardImg={room.images[1] || Images.room_default}
//                         imgClass="h-[200px]"
//                         itemPrice={room.price}
//                         cardLabel={true}
//                         insideData={true}
//                         outsideData={false}
//                         itemName={room.roomNumber}
//                         itemLocation="item location"
//                       />
//                     </div>
//                   ))
//                 : "nodata"}
//             </div>

//             {/* pagination */}
//             <div className="flex items-center gap-4 justify-center mb-10 mt-10">
//               <Button
//                 variant="text"
//                 className="flex items-center gap-2"
//                 onClick={prev}
//                 disabled={active === 1}
//               >
//                 <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
//               </Button>
//               <div className="flex items-center gap-2">
//                 <IconButton {...getItemProps(1)}>1</IconButton>
//                 <IconButton {...getItemProps(2)}>2</IconButton>
//                 <IconButton {...getItemProps(3)}>3</IconButton>
//                 <IconButton {...getItemProps(4)}>4</IconButton>
//                 <IconButton {...getItemProps(5)}>5</IconButton>
//               </div>
//               <Button
//                 variant="text"
//                 className="flex items-center gap-2"
//                 onClick={next}
//                 disabled={active === 5}
//               >
//                 Next
//                 <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
//               </Button>
//             </div>
//           </>
//         )}
//         {/*  */}
//       </div>
//     </div>
//   );
// };

// export default ExplorePage;

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "../../shared/page-title/page-title";
import ItemCard from "../../shared/item-card/item-card";
import Images from "../../../../assets/Images/Images";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import SkeletonOne from "../../shared/skeleton/skeleton-one";
import { getAllRooms } from "../../../../networking/rooms.services";
import "./explore-page.scss";

const ExplorePage = () => {
  const { t, i18n } = useTranslation();
  const [roomsList, setRoomsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  async function getRoomsList() {
    try {
      setLoading(true);
      const response = await getAllRooms(currentPage, itemsPerPage);
      setRoomsList(response.data?.data?.rooms || []);
      setTotalCount(response.data?.data?.totalCount || 0);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRoomsList();
  }, [currentPage]);

  return (
    <div id="explore_page">
      <div className="container_bx">
        {/* page title */}
        <PageTitle
          roomName={t("explore_all_rooms")}
          roomLink="/explore-rooms"
          linkText={t("explore")}
        />

        <h1 className="text-[#152C5B] text-[21px] font-semibold mt-8">
          {t("all_rooms")}
        </h1>

        {loading ? (
          <div className="mt-5"><SkeletonOne /></div>
        ) : (
          <>
            <div className="grid grid-cols-12 gap-4 mt-5">
              {roomsList.length > 0
                ? roomsList.map((room, index) => (
                    <div
                      key={index}
                      className="col-span-12 md:col-span-6 lg:col-span-3 mb-5"
                    >
                      <ItemCard
                        cardImg={room?.images[0] || Images.room_default}
                        imgClass="h-[200px]"
                        itemPrice={room?.price}
                        cardLabel={true}
                        insideData={true}
                        outsideData={false}
                        itemName={room?.roomNumber}
                        itemLocation="item location"
                        roomLink={`/room-details/${room?._id}`}
                        roomId={room?._id}
                      />
                    </div>
                  ))
                : <div>No data available</div>}
            </div>

            {/* pagination */}
            {totalPages > 1 && (
              <div className="flex items-center gap-4 justify-center mb-10 mt-10">
                <Button
                  variant="text"
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <IconButton
                        key={page}
                        variant={currentPage === page ? "filled" : "text"}
                        color="gray"
                        className={`cursor-pointer ${currentPage === page ? "bg-[#3252DF]" : ""}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </IconButton>
                    )
                  )}
                </div>

                <Button
                  variant="text"
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
