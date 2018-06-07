import format from "date-fns/format";

/**
 * Returns the date formated like this: YYYY-MM-DD
 * @param {Date} date Date to format
 */
const shortFormatDate = (date = new Date()) => format(date, "YYYY-MM-DD");

const longFormatDate = (date = shortFormatDate()) => format(date, "dddd Do MMMM");

export { shortFormatDate, longFormatDate };
