import React from "react";

import { POSITION_OPTIONS } from "./geo-position";

function GeoError({ error }) {
  let message = "";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // message = "User denied the request for Geolocation.";
      message = "המשתמש חסם את הבקשה לשירותי מיקום.";
      break;
    case error.POSITION_UNAVAILABLE:
      // message = "Location information is unavailable.";
      message = "מידע על המיקום אינו זמין.";
      break;
    case error.TIMEOUT:
      // message = "The request to get user location timed out.";
      message = `המכשיר לא הצליח לקבל מיקום לאחר ${POSITION_OPTIONS.timeout /
        1000} שניות .`;
      break;
    case error.UNKNOWN_ERROR:
      // message = "An unknown error occurred.";
      message = "שגיאה לא ידועה.";
      break;
    default:
      message = error.code;
      break;
  }

  return message;
}

export default GeoError;
