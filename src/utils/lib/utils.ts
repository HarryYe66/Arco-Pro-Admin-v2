export const generateUUID = () => {
  const s: any[] = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
};

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000); // 如果传入的是秒级时间戳，乘以1000转换为毫秒级

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从0开始，+1后不足两位前面补0
  const day = ('0' + date.getDate()).slice(-2); // 日期不足两位前面补0
  const hours = ('0' + date.getHours()).slice(-2); // 小时不足两位前面补0
  const minutes = ('0' + date.getMinutes()).slice(-2); // 分钟不足两位前面补0
  const seconds = ('0' + date.getSeconds()).slice(-2); // 秒数不足两位前面补0

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
