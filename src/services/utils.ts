/**
 * Date型をYYYYMMDD形式の文字列に変換
 */
export const cvDateToStr = (date: Date): string => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}${month}${day}`;
};
