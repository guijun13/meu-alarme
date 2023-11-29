export default function formatDate(dataString) {
  // Criar um objeto de data a partir da string fornecida
  const data = new Date(dataString);

  // Obter dia, mês, hora e minuto
  const dia = data.getDate();
  const mes = data.getMonth() + 1; // Meses começam do zero, então é necessário adicionar 1
  const hora = data.getHours();
  const minuto = data.getMinutes();

  // Formatar os valores para garantir que tenham dois dígitos
  const diaFormatado = dia < 10 ? `0${dia}` : dia;
  const mesFormatado = mes < 10 ? `0${mes}` : mes;
  const horaFormatada = hora < 10 ? `0${hora}` : hora;
  const minutoFormatado = minuto < 10 ? `0${minuto}` : minuto;

  // Construir a string formatada
  const dataFormatada = `${diaFormatado}/${mesFormatado} - ${horaFormatada}:${minutoFormatado}`;

  return dataFormatada;
}
