import { BASE_URL } from "./app-constants";

// HEADERS TOKEN
export const BASE_HEADERS = {
  headers: {
    Authorization: `${JSON.parse(localStorage?.getItem("infooooo"))?.token}`,
  },
};

// ROOMS ADMIN URL
const BASE_ADMIN_ROOMS = `${BASE_URL}/admin/rooms`;

export const ROOMS_ADMIN_URLS = {
  getAll: `${BASE_ADMIN_ROOMS}`,
  getRoomDetails: (id) => `${BASE_ADMIN_ROOMS}/${id}`,
  addRoom: `${BASE_ADMIN_ROOMS}`,
  updateRoom: (id) => `${BASE_ADMIN_ROOMS}/${id}`,
  deleteRoom: (id) => `${BASE_ADMIN_ROOMS}/${id}`,
};

// ADS ADMIN URL
const BASE_ADMIN_ADS = `${BASE_URL}/admin/ads`;

export const ADS_ADMIN_URLS = {
  getAllAds: `${BASE_ADMIN_ADS}`,
  getAdsDetails: (id) => `${BASE_ADMIN_ADS}/${id}`,
  addAds: `${BASE_ADMIN_ADS}`,
  updateAds: (id) => `${BASE_ADMIN_ADS}/${id}`,
  deleteAds: (id) => `${BASE_ADMIN_ADS}/${id}`,
};

// ROOMS FACILITIES ADMIN URL
const BASE_ADMIN_ROOMS_FACILITIES = `${BASE_URL}/admin/room-facilities`;

export const ROOMS_FACILITIES_ADMIN_URLS = {
  getAllFacilities: `${BASE_ADMIN_ROOMS_FACILITIES}`,
  addFacility: `${BASE_ADMIN_ROOMS_FACILITIES}`,
  updateFacility: (id) => `${BASE_ADMIN_ROOMS_FACILITIES}/${id}`,
  getFacilityDetails: (id) => `${BASE_ADMIN_ROOMS_FACILITIES}/${id}`,
  deleteFacility: (id) => `${BASE_ADMIN_ROOMS_FACILITIES}/${id}`,
};
