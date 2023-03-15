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

  static getArrayDuplicateElements(array: string[]): string[] {
    const duplicates = array.filter((item, index) => array.indexOf(item) !== index);
    return duplicates;
  }

  static async delay(ms: number) {
    new Promise(r => setTimeout(r, ms));
  }

  static getPriceString(priceStr: string): string {
    const currency = priceStr.replace(/,/g, '').split('$')[1].trim();
    return parseFloat(currency).toFixed(2);
  }
}

  