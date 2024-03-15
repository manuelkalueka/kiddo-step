import moment from "moment";

function relativeTime(dateStr) {
  // Parse a string no formato YYYYMMDD em um objeto Date
  const date = moment(dateStr, "YYYYMMDD");

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

export { relativeTime, formatDate };
