// BASE URL
export const BASE_URL = "https://upskilling-egypt.com:3000/api/v0";

// BASE IMAGES URL
export const BASE_IMG_URL = "https://upskilling-egypt.com:3000";

// HEADERS TOKEN
export const BASE_HEADERS = {
  headers: {
    Authorization: `${JSON.parse(localStorage?.getItem("infooooo"))?.token}`,
  },
};