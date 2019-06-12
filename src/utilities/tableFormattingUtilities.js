import i18next from "i18next";
import genderEnum from "../models/enumerations/genderEnum";

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
  }
};

export default tableFormattingUtilities;
