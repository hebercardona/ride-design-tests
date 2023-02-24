import { Common } from "@framework/Common";

export class TestData {
    
    static NORTH_AMERICA_EMAIL = 'testenusinternal@polaris.com';
    static APLA_EMAIL = 'testaplainternal@polaris.com';
    static EMEA_EMAIL = 'testemeainternal@polaris.com';
    static EMEA_LOCALES: string[] = ['en-ie','pt-pt','sv-se','nb-no','fi-fi','nl-be','fr-be','nl-nl','en-gb','en-au','en-nz','es-es','de-de','de-at','de-ch','fr-ch','fr-fr','fr-lu','en-001'];
    static APLA_LOCALES: string[] = ['ar-sa','en-za','en-in'];
    static NORTH_AMERICA_LOCALES = ['en-us','es-us','en-ca','fr-ca','es-mx'];
    static POSTAL_CODES = {
        'en-us': '98008',
        'es-us': '98008',
        'en-ca': 'V5M 2E4',
        'fr-ca': 'V5M 2E4',
        'es-mx': '67170',
        'en-ie': 'D01 V902',
        'pt-pt': '1000-001',
        'sv-se': '103 16',
        'nb-no': '0153',
        'fi-fi': '00220',
        'nl-be': '1020',
        'fr-be': '1020',
        'nl-nl': '1101 CM',
        'en-gb': 'EC1A 1HQ',
        'en-au': '2043',
        'en-nz': '0810',
        'es-es': '28006',
        'de-de': '80798',
        'de-at': '1070',
        'de-ch': '8040',
        'fr-ch': '8040',
        'fr-fr': '75005',
        'fr-lu': '5824',
        'en-001': {
            'qatar': '122104'
        }

    }

    static ACCOUNTS = {
        REGULAR: {
            email: 'testenusinternal@polaris.com',
            password: 'Polaris2014'
        },
        MILITARY: {
            email: 'ramya.ginugu@polaris.com',
            password: 'Polaris2015'
        }
    }

    static getTestEmail(url: string): string {
        let email: string;
        const locale = Common.getUrlLocale(url);
        if(this.NORTH_AMERICA_LOCALES.includes(locale)) {
            email = this.NORTH_AMERICA_EMAIL;
        } else if(this.EMEA_LOCALES.includes(locale)) {
            email = this.EMEA_EMAIL;
        } else if(this.APLA_LOCALES.includes(locale)) {
            email = this.APLA_EMAIL;
        } else {
            email = this.NORTH_AMERICA_EMAIL;
        }
        return email;
    }

    static getTestPostalCode(url: string): string {
        let postalcode: string;
        const locale = Common.getUrlLocale(url);
        postalcode = this.POSTAL_CODES[locale];
        return postalcode;
    }
}