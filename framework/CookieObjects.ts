import { testConfig } from "@testConfig";

export interface cookie {
    name: string,
    value: string,
    path: string,
    domain: string
}

export class CookieObjects {

    static getNoticePreferenceAcknowledeCookie(): cookie[] {
        let cookies: cookie[] = [];
        Object.values(testConfig.brandDomains).forEach(value => {
        cookies.push(
            {
                name: 'notice_preferences',
                value: '2:',
                path: '/',
                domain: value as string
            }
        );
    });
    return cookies;
    }
}