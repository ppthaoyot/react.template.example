export const APP_INFO = {
  name: "Standard Demo",
  version: "0.1",
  since: "2020",
  description: "Siam smile",
  contactUrl: "https://www.siamsmile.co.th",
};

export const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api" //Dev
    : "http://localhost:5000/api"; //Production

// "http://uat.siamsmile.co.th:9188/api"
// "http://localhost:54821/api"

export const ROLES = {
  user: "user",
  Manager: "Manager",
  admin: "Admin",
  developer: "Developer",
};
