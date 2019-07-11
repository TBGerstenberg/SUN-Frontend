import i18next from "i18next";
import moment from "moment-with-locales-es6";
import facultyEnum from "../models/enumerations/facultyEnum";
import genderEnum from "../models/enumerations/genderEnum";
import postTypeEnum from "../models/enumerations/postTypeEnum";
import titleEnum from "../models/enumerations/titleEnum";

/**
 * A set of utilites to render null, undefined, enum, dateTime or date
 * values in a human readable format.
 */
const tableFormattingUtilities = {
  //Returns a given boolean as a String
  stringValueForBoolean: boolean => {
    return boolean ? "true" : "false";
  },

  // Returns a string or an empty string, if the parameter is undefined or null
  stringOrEmpty: string => {
    return string ? string : "";
  },

  // Returns a number or the string "none", if the parameter is undefined or null
  numberOrEmpty: number => {
    return number ? number : "none";
  },

  // Returns a localized String for a value within the genderEnum @see src/models/enumerations/genderEnum
  genderEnumToString: genderEnumValue => {
    return i18next.t(`gender-enum-${genderEnum[genderEnumValue]}-option`);
  },

  // Returns a localized String for a value within the titleEnum @see src/models/enumerations/titleEnum
  titleEnumToString: titleEnumValue => {
    return i18next.t(`title-enum-${titleEnum[titleEnumValue]}-option`);
  },

  // Returns a localized String for a value within the postTypeEnunm @see src/models/enumerations/postTypeEnum
  postTypeEnumToString: postEnumValue => {
    return i18next.t(`postType-enum-${postTypeEnum[postEnumValue]}-option`);
  },

  // Utilizes moment.js to format a given date in the format DD.MM.YYYY
  getFormattedDate: dateString => {
    return moment(dateString).format("DD.MM.YYYY");
  },

  // Utilizes moment.js to format a given datetimestring in the format DD.MM.YYYY hh:mm
  getFormattedDateTime: dateString => {
    return moment(dateString).format("llll"); // DD.MM.YYYY hh:mm
  },

  // Gets a localized string describing the time that has elapsed since a given date or dateTime.
  getTimeSinceCreated: dateString => {
    return moment(dateString).fromNow();
  },

  // Returns a localized String for a value within the facultyEnum @see src/models/enumerations/facultyEnum
  facultyEnumToString: facultyEnumValue => {
    return i18next.t(`faculty-enum-${facultyEnum[facultyEnumValue]}-option`);
  }
};

export default tableFormattingUtilities;
