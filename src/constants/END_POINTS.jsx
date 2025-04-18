import { BASE_URL } from "./app-constants";

// HEADERS TOKEN
export const BASE_HEADERS = {
  headers: {
    Authorization: `${JSON.parse(localStorage?.getItem("infooooo"))?.token}`,
  },
};

// ROOMS URL
const BASE_ROOMS = `${BASE_URL}/portal/rooms`;

export const ROOMS_URLS = {
  getAll: `${BASE_ROOMS}/available`,
  getRoomDetails: (id) => `${BASE_ROOMS}/${id}`,
  addRoom: `${BASE_ROOMS}`,
};

// FAVOURITES URL
const BASE_FAVOURITES = `${BASE_URL}/portal/favorite-rooms`;

export const ROOMS_FAVOURITES = {
  getAllFav: `${BASE_FAVOURITES}`,
  addFav: `${BASE_FAVOURITES}`,
  deleteFav: (id) => `${BASE_FAVOURITES}/${id}`,
};

// ROOM REVIEWS
const BASE_REVIEWS = `${BASE_URL}/portal/room-reviews`;

export const ROOM_REVIEWS = {
  getAllReviews: (id) => `${BASE_REVIEWS}/${id}`,
  addReview: `${BASE_REVIEWS}`,
};

// ADS URL
const BASE_ADS = `${BASE_URL}/portal/ads`;

export const ADS_ROOMS = {
  getAllAds: `${BASE_ADS}`,
  getRoomDetails: (id) => `${BASE_ADS}/${id}`,
};

// BOOKING URL
const BASE_BOOKING = `${BASE_URL}/portal/booking`;

export const ROOM_BOOKING = {
  addBooking: `${BASE_BOOKING}`,
  getAllBooking: `${BASE_BOOKING}/my`,
  getBookDetails: (id) => `${BASE_BOOKING}/${id}`,
};

// ROOM COMMENTS
const BASE_COMMENTS = `${BASE_URL}/portal/room-comments`;

export const ROOM_COMMENTS = {
  getAllComments: (id) => `${BASE_COMMENTS}/${id}`,
  addComment: `${BASE_COMMENTS}`,
  deleteComment: (id) => `${BASE_COMMENTS}/${id}`,
  updateComment: (id) => `${BASE_COMMENTS}/${id}`,
};

// ROOMS FACILITIES ADMIN URL
const BASE_ADMIN_ROOMS_FACILITIES = `${BASE_URL}/admin/room-facilities`;

export const ROOMS_FACILITIES_ADMIN_URLS = {
  getAllFacilities: `${BASE_ADMIN_ROOMS_FACILITIES}`,
};

// USERS GUEST URL
const BASE_GUEST_USERS = `${BASE_URL}/portal/users`;

export const USERS_GUEST_URLS = {
  login: `${BASE_GUEST_USERS}/Login`,
  register: `${BASE_GUEST_USERS}`,
  forgotPass: `${BASE_GUEST_USERS}/forgot-password`,
  resetPass: `${BASE_GUEST_USERS}/reset-password`,
  authGoogle: `${BASE_GUEST_USERS}/auth/google`,
  userInfo: (_id) => `${BASE_GUEST_USERS}/${_id}`,
};
