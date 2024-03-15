import moment from "moment";

 function relativeTime(date) {
  const dateRelative = moment(date, "YYYYMMDD").locale("pt").fromNow();

  return dateRelative;
}

function formatDate(date) {
  const formatedDate = moment(date, "YYYYMMDD").locale("pt").fromNow();

  return formatedDate;
}


export {relativeTime, formatDate}