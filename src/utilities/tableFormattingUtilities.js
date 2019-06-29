import i18next from "i18next";
import genderEnum from "../models/enumerations/genderEnum";
import postTypeEnum from "../models/enumerations/postTypeEnum";
import moment from "moment-with-locales-es6";

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
  postTypeEnumToString: postEnumValue => {
    return i18next.t(`postType-enum-${postTypeEnum[postEnumValue]}-option`);
  },
  getFormattedDate: dateString => {
    return moment(dateString).format("DD-MM-YYYY");
  },
  getTimeSinceCreated: dateString => {
    return moment(dateString).fromNow();
  }
};

export default tableFormattingUtilities;
