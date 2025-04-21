// BASE URL
export const BASE_URL = "https://upskilling-egypt.com:3003/api/v1";

// BASE IMAGES URL
export const BASE_IMG_URL = "https://upskilling-egypt.com:3003";

// HEADERS TOKEN
export const BASE_HEADERS = {
  headers: {
    Authorization: `${JSON.parse(localStorage?.getItem("infooooo"))?.token}`,
  },
};