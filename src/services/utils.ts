/**
 * 日付型から文字列の年・月・日を取得
 *
 * @param dateString チェック対象の文字列
 */
const getYMDStr = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return { year: year, month: month, day: day };
};

/**
 * Date型をYYYYMMDD形式の文字列に変換
 */
export const cvDateToStr = (date: Date): string => {
  const { year, month, day } = getYMDStr(date);
  return `${year}${month}${day}`;
};

/**
 * 文字列の日付の形式を変更 YYYYMMDD -> YYYY-MM-DD
 */
export const convertToDashFormat = (inputDate: string): string => {
  const year = inputDate.slice(0, 4);
  const month = inputDate.slice(4, 6);
  const day = inputDate.slice(6, 8);
  return `${year}-${month}-${day}`;
};

/**
 * 翌日の日付をYYYY-MM-DD形式で取得
 *
 * @param date 日付(YYYYMMDD)の文字列
 * @return 対象日付の翌日
 */
export const getTomorrowDate = (inputDate: string) => {
  const today = new Date(convertToDashFormat(inputDate));
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
};

/**
 * 文字列の形式を変換'yyyy年mm月dd日' -> 'YYYYMMDD形式'
 *
 * @param dateString チェック対象の文字列
 */
export const cvDateStrPattern = (dateString: string): string => {
  const pattern = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/;
  const parts = dateString.match(pattern);
  if (parts) {
    const year = parts[1];
    const month = parts[2].padStart(2, '0');
    const day = parts[3].padStart(2, '0');
    return `${year}${month}${day}`;
  }
  return '';
};

/**
 * 対象文字列が'yyyy年mm月dd日'に該当するか判定
 *
 * @param dateString チェック対象の文字列
 */
export const checkYmdstr = (dateString: string): boolean => {
  const pattern = /^\d{4}年\d{1,2}月\d{1,2}日$/;
  return pattern.test(dateString);
};

/**
 * 数字の小数点未満を丸めて文字列を返す
 *
 * @param num 数字
 * @return 処理後の文字列
 */
export const cvNumToRoundStr = (num: number): string => {
  return Math.round(num).toString();
};
