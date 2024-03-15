import moment from "moment";

export function formatDate(date) {
  const dateRelative = moment(date, "YYYYMMDD").locale("pt").fromNow();

  return dateRelative;
}
