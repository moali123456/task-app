import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { PencilSquareIcon, StarIcon } from "@heroicons/react/24/outline";
import CommentsTab from "./comments-tab";
import ReviewsTab from "./reviews-tab";

const AboutTabs = ({ roomId }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("reviews");
  

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      {/* Force re-render by changing key when activeTab updates */}
      <TabsHeader
        key={activeTab}
        className="bg-[#e7eeff] py-2 px-2 transition-all duration-300"
      >
        <Tab
          value="reviews"
          className="py-2 px-2"
          onClick={() => setActiveTab("reviews")}
        >
          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 text-amber-500" />
            <span className="text-[#152C5B] text-lg font-semibold">
              {t("reviews")}
            </span>
          </div>
        </Tab>

        <Tab
          value="comments"
          className="py-2 px-2"
          onClick={() => setActiveTab("comments")}
        >
          <div className="flex items-center gap-2">
            <PencilSquareIcon className="w-5 h-5 text-[#3252DF]" />
            <span className="text-[#152C5B] text-lg font-semibold">
              {t("comments")}
            </span>
          </div>
        </Tab>
      </TabsHeader>

      <TabsBody>
        {/* review tab */}
        <TabPanel value="reviews">
          <ReviewsTab roomId={roomId} />
        </TabPanel>
        {/*  */}

        {/* comments tab */}
        <TabPanel value="comments">
          <CommentsTab roomId={roomId} />
          
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default AboutTabs;
