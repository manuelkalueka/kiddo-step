import moment from "moment";

function relativeTime(dateStr) {
  // Parse a string no formato YYYYMMDD em um objeto Date
  const date = moment(dateStr);

  // Define a localização para português de Portugal
  moment.locale("pt-PT");

  // Retorna a data relativa em formato de frase
  return date.fromNow();
}

function formatDate(dateStr) {
  const date = moment(dateStr);
  moment.locale("pt-PT");

  // Formata a data no formato DD/MM/YYYY
  return date.format("DD/MM/YYYY");
}

function getHour(date) {
  const dataString = date;
  // Converta a string para um objeto Moment
  const dataMoment = moment(dataString);

  // Extraia apenas a hora da data
  const hora = dataMoment.format("HH:mm:ss");
  return hora;
}

export { relativeTime, formatDate, getHour };
