/**
 * Date Formatters
 * *******************************************************************************************************************
 */

export const dateConvertNaissanceRAW = (dat) => {
  if (dat && dat !== undefined && dat !== "") {
    return dat?.split("-").reverse().join("/");
  } else {
    return "";
  }
};

/**
 *
 * @param dat String yyyy-mm-dd (Can be Lunar type, meaning there have no restriction in number of days and month as 1900-35-35)
 * @returns {string} dd/mm/yyyy
 */
export const dateConvertNaissance = (dat) => {
  if (dat == undefined) return "";

  let pattern = /^(\d{4})(\d{2})(\d{2})/i;
  let match = pattern.exec(dat);
  let ssn = {};

  ssn.year = match[1];
  ssn.month = match[2];
  ssn.day = match[3];

  if (dat && dat !== undefined && dat !== "") {
    let { year, month, day } = ssn;
    return `${day}/${month}/${year}`;
  } else {
    return "";
  }
};
/**
 *
 * @param dat String yyyy-mm-dd
 * @param hh if true add in result HH:MM:SS
 * @returns {string} dd/mm/yyyy hh:mm:ss
 */
export const convertDate = (dat, hh = false) => {
  if (dat && dat !== undefined && dat !== "") {
    if (!hh) {
      return new Date(dat).toLocaleDateString("fr");
    } else {
      return new Date(dat).toLocaleString("fr", { hour12: false });
    }
  } else {
    return "";
  }
};

export const isValidDate = (d) => {
  try {
    d.toISOString();
    return true;
  } catch (ex) {
    return false;
  }
};

/**
 *
 * @param dateStr
 * console.log(new Intl.DateTimeFormat('en-US').format(date));
 * @constructor
 */
export const IntlDateWithHHMM = (dateStr) => {
  const p = new Intl.DateTimeFormat("fr", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  })
    .formatToParts(dateStr)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
};

/**
 *
 * @type {Intl.NumberFormat}
 *
 * usage currencyFormatter.format(20)
 * return 20,00 €
 */
export const currencyFormatter = new Intl.NumberFormat("fr", {
  style: "currency",
  currency: "EUR",
});
