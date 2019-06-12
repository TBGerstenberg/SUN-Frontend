const tableFormattingUtilities = {
  stringValueForBoolean: boolean => {
    return boolean ? "true" : "false";
  },
  stringOrEmpty: string => {
    return string ? string : "";
  },
  numberOrEmpty: number => {
    return number ? number : "none";
  }
};

export default tableFormattingUtilities;
