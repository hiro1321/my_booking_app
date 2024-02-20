/**
 * Date型をYYYYMMDD形式の文字列に変換
 */
export const cvDateToStr = (date: Date): string => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}${month}${day}`;
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
