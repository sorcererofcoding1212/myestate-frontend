import type { City } from "./types";

export const HOME = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const FORGOT_PASSWORD = "/password/forgot";
export const RESET_PASSWORD = "/password/reset";
export const VERIFY_OTP = "/verify-otp";
export const LIST = "/list";
export const BUY = "/buy";
export const RENT = "/rent";
export const CREATE_LISTING = "/create-listing";
export const VIEW_LISTING = "/listing-details";
export const INBOX = "/inbox"
export const FAVORITES = "/favorites"

export const CITY_DATA: City[] = [
  {
    name: "Mumbai",
    image: "city-mumbai.jpg",
    description: "Explore properties in Mumbai",
  },
  {
    name: "Delhi",
    image: "city-delhi.jpg",
    description: "Explore properties in Delhi",
  },
  {
    name: "Pune",
    image: "city-pune.jpg",
    description: "Explore properties in Pune",
  },
  {
    name: "Chennai",
    image: "city-chennai.jpg",
    description: "Explore properties in Chennai",
  },
  {
    name: "Ahmedabad",
    image: "city-ahmedabad.jpg",
    description: "Explore properties in Ahmedabad",
  },
  {
    name: "Bangalore",
    image: "city-bangalore.jpg",
    description: "Explore properties in Bangalore",
  },
  {
    name: "Kolkata",
    image: "city-kolkata.jpg",
    description: "Explore properties in Kolkata",
  },
];
