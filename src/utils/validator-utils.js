import { convertDate } from "./convertor-utils";
/**
 * Form Validators
 * *******************************************************************************************************************
 */
const required = (value) => (value ? undefined : "Required");

const mustBeNumber = (value) => {
  let result = value;
  if (value) result = isNaN(value) ? "Format incorrect" : undefined;
  return result;
};

const minValue = (min) => (value) => {
  let result =
    value === undefined || value.toString().length >= min
      ? undefined
      : `minimum ${min} caractères`;
  return result;
};

const maxValue = (max) => (value) => {
  let result =
    value === undefined || value.toString().length < max
      ? undefined
      : `maximum ${max - 1} caractères`;
  return result;
};

const noFutureDate = () => (value) => {
  let date1,
    date2 = null;

  if (value && value !== undefined && value !== "") {
    date1 = new Date(value);
    date2 = new Date();
    if (date1 > date2)
      return `La date ne peut pas être ultérieure à la date du jour`;
  }
  return undefined;
};

const notBiggerThan = (max) => (value) => {
  let result =
    isNaN(value) || value === undefined || Number(value) < Number(max)
      ? undefined
      : `maximum ${max - 0.01}`;
  return result;
};

const beforeThan = (values, thanField) => (value) => {
  let date1,
    date2 = null;

  if (
    value &&
    value !== undefined &&
    value !== "" &&
    values[thanField] &&
    values[thanField] !== "" &&
    values[thanField] !== undefined
  ) {
    date1 = new Date(value);
    date2 = new Date(values[thanField]);

    if (date1 < date2)
      return `Date après le: ${convertDate(values[thanField])}`;
  }
  return undefined;
};

const afterThan = (values, thanField) => (value) => {
  let date1,
    date2 = null;

  if (
    value &&
    value !== undefined &&
    value !== "" &&
    values[thanField] &&
    values[thanField] !== "" &&
    values[thanField] !== undefined
  ) {
    date1 = new Date(value);
    date2 = new Date(values[thanField]);

    if (date1 > date2)
      return `should be Lower than ${Object.values(thanField)}`;
  }
  return undefined;
};

/**
 *
 * @param values from final-form
 * @param associed array of strings (keys from form)
 * @returns {function(*=): string}
 */
const associated = (values, associed, nameMsg, defaultMsg) => (value) => {
  let isOk = true;

  if (associed && value && value !== undefined && value !== "") {
    isOk = false;
    associed.forEach((el) => {
      if ( (el == "dateDeNaissance" || el == "dateNaissance" || el == "dateNaiss" || el == "dateNai") && (!values[el] || values[el] == undefined || values[el] == "") ) {
        if ( !( !values["birdDate"] || values["birdDate"] == undefined || values["birdDate"] == "" ) ) {
          isOk = true;
        }
      } else if ( !(!values[el] || values[el] == undefined || values[el] == "") ) {
        isOk = true;
      }
    });
  }

  return isOk
    ? undefined
    : (defaultMsg)? defaultMsg : `Vous ne pouvez pas rechercher un bénéficiaire uniquement par ${nameMsg?.toLowerCase()}. Merci d'ajouter un critère de recherche.`;
};

const composeValidators =
  (...validators) =>
  (value) => {
    let result = validators.reduce((error, validator) => {
      return error || validator(value);
    }, undefined);
    return result;
  };

export const validators = {
  composeValidators,
  required,
  mustBeNumber,
  minValue,
  maxValue,
  noFutureDate,
  associated,
  beforeThan,
  afterThan,
  notBiggerThan,
};

export const calcCleFromNir = (values) => {
  let ssn = {};
  ssn.cle = null;

  let cle = null;
  let { nir } = values;

  if (nir?.length > 13) {
    console.log("invalid number");
  }

  let pattern =
    /^([1278])(\d{2})(0[1-9]|1[0-2]|20)(\d{2}|2[AB])(\d{3})(\d{3})/i;
  let match = pattern.exec(nir);

  if (match && !ssn.cle) {
    ssn.gender = match[1];
    ssn.year = match[2];
    ssn.month = match[3];
    ssn.department = match[4];
    ssn.city = match[5];
    ssn.certificate = match[6];
    ssn.key = match[7];

    if (ssn.certificate == "000" || ssn.key * 1 > 97) {
      console.log("invalid certificate");
      return null;
    }

    if (ssn.department == "2A") {
      ssn.department = "19";
    } else if (ssn.department == "2B") {
      ssn.department = "18";
    } else if (ssn.department == "97") {
      ssn.department += ssn.city[0];
      if (ssn.department * 1 < 970 || ssn.department * 1 >= 989) {
        console.log("invalid department");
        return null;
      }
      ssn.city = ssn.city.substring(1);
      if (ssn.city * 1 < 1 || ssn.city * 1 > 90) {
        console.log("invalid city");
        return null;
      }
    } else if (ssn.city * 1 < 1 || ssn.city * 1 > 990) {
      console.log("invalid city");
      return null;
    }

    let insee =
      ssn.gender +
      ssn.year +
      ssn.month +
      ssn.department.replace("A", "0").replace("B", "0") +
      ssn.city +
      ssn.certificate;

    cle = 97 - ((insee * 1) % 97);
    if (cle < 9) cle = "0" + cle;
    return cle;
  } else {
    return null;
  }
};

// export const selectDeselectAllValues = (fieldObj, ref, field) => {
//   if (fieldObj && fieldObj[field]) {
//     if (
//       fieldObj[field].length === 0 ||
//       (fieldObj[field].includes("all") &&
//         fieldObj[field].length > Object.keys(ref).length)
//     )
//       return { [field]: undefined };
//
//     if (fieldObj[field].includes("all")) return { [field]: Object.keys(ref) };
//   }
// };

export const allowSearch = (values) => {

  for (let key in values) {
      if (values[key]) return true;
  }
  return false;
}

