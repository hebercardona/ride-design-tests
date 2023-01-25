export class Common {
  static stringFormat(str: string, ...val: string[]) {
    for (let index = 0; index < val.length; index++) {
      str = str.replace(`{${index}}`, val[index]);
    }
    return str;
  }

  static getUrlLocale(url: string): string {
    const locale = /com\/([^\/]+)/.exec(url)[1];
    return locale;
  }
}

  