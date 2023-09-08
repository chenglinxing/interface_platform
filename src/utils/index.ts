/**
 * 校验url是否合法
 * @param url url地址
 * @returns true | false
 */
function isValidateUrl(url: string): boolean {
    const urlRegex = /^(https?:\/\/)?(localhost|\b(?:[a-z\d](?:[a-z\d-]*[a-z\d])*\.)+[a-z]{2,6}\b)(?::\d{1,5})?(?:\/[^?\s]*)?(?:\?[^#\s]*)?(?:#[^\s]*)?$/i;
    return urlRegex.test(url);
}

/**
 * 清除字符串所有空格
 * @param str 传入字符串
 * @returns 返回去除空格的字符串
 */
function removeSpaces(str: string): string {
    return str.replace(/\s/g, '');
}

export { isValidateUrl, removeSpaces }