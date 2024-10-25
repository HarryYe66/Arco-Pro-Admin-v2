interface SystemInfo {
  os: string;
  version: string;
}

/**
 * 获取用户系统标识
 * @param userAgent User-Agent
 * @returns SystemInfo
 */
export function parseUserAgent(userAgent: string): SystemInfo | null {
  const osRegexes = [
    { regex: /\bWindows NT (\d+\.\d+)/i, os: 'Windows' },
    { regex: /\bMac OS X (\d+_\d+_\d+)/i, os: 'Mac OS X' },
    { regex: /\bAndroid (\d+\.\d+)/i, os: 'Android' },
    { regex: /\biPhone OS (\d+_\d+)/i, os: 'iOS' },
    { regex: /\bLinux\b/i, os: 'Linux' },
  ];

  for (const { regex, os } of osRegexes) {
    const match = userAgent.match(regex);
    if (match && match[1]) {
      return {
        os,
        version: match[1].replace(/_/g, '.'),
      };
    }
  }

  return null;
}

export function getFirstLetter(username) {
  if (!username) return ''; // 如果用户名为空，返回空字符串
  return username.charAt(0).toUpperCase(); // 返回用户名的第一位并转换为大写
}

/**
 * 将10位时间戳转换为日期
 * @param timestamp 10位时间戳
 * @param locale 语言环境 韩国（ko-KR）、日本（ja-JP）（en-US 或 en-GB）
 * @returns
 */
export function convertTimestampToDate(timestamp: number, locale = 'en-US') {
  // 将10位时间戳转换为13位毫秒时间戳
  const date = new Date(timestamp * 1000);

  // 使用toLocaleString来格式化时间，默认使用中文格式
  const formattedDate = date.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return formattedDate.replace(/\//g, '-'); // 将日期中的斜杠替换为连字符
}

/**
 * 计算完成度百分比
 * @param currentValue 当前值
 * @param maxValue 最大值
 * @param toFixedVal 保留小数位 默认2
 * @returns 完成度百分比，保留两位小数
 */
export function calculateCompletionPercentage(
  currentValue: number,
  maxValue: number,
  toFixedVal = 2
): number {
  if (maxValue === 0) {
    return 0; // 防止除以0的错误
  }

  const percentage = (currentValue / maxValue) * 100;
  return parseFloat(percentage.toFixed(toFixedVal)); // 保留两位小数并返回数值
}

// const systemInfo = parseUserAgent(userAgent)

// if (systemInfo) {
//   console.log(`Operating System: ${systemInfo.os}`)
//   console.log(`Version: ${systemInfo.version}`)
// } else {
//   console.log('Operating System not recognized')
// }
