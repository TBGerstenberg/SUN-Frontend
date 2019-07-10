import i18next from "i18next";
import moment from "moment-with-locales-es6";
import facultyEnum from "../models/enumerations/facultyEnum";
import genderEnum from "../models/enumerations/genderEnum";
import postTypeEnum from "../models/enumerations/postTypeEnum";
import titleEnum from "../models/enumerations/titleEnum";

const tableFormattingUtilities = {
  stringValueForBoolean: boolean => {
    return boolean ? "true" : "false";
  },
  stringOrEmpty: string => {
    return string ? string : "";
  },
  numberOrEmpty: number => {
    return number ? number : "none";
  },
  genderEnumToString: genderEnumValue => {
    return i18next.t(`gender-enum-${genderEnum[genderEnumValue]}-option`);
  },
  titleEnumToString: titleEnumValue => {
    return i18next.t(`title-enum-${titleEnum[titleEnumValue]}-option`);
  },
  postTypeEnumToString: postEnumValue => {
    return i18next.t(`postType-enum-${postTypeEnum[postEnumValue]}-option`);
  },
  getFormattedDate: dateString => {
    return moment(dateString).format("DD.MM.YYYY");
  },
  getFormattedDateTime: dateString => {
    return moment(dateString).format("llll"); // DD.MM.YYYY hh:mm
  },
  getTimeSinceCreated: dateString => {
    return moment(dateString).fromNow();
  },
  facultyEnumToString: facultyEnumValue => {
    return i18next.t(`faculty-enum-${facultyEnum[facultyEnumValue]}-option`);
  }
};

export default tableFormattingUtilities;
