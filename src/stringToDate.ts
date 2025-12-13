export default function stringToDate(text: string): Date {
  const [data, tempo] = text.split(' ');
  const [dia, mes, ano] = data.split('/').map(Number);
  const [hora, minuto] = tempo.split(':').map(Number);
  const dataNormalizada = new Date(ano, mes - 1, dia, hora, minuto);
  return dataNormalizada;
}
