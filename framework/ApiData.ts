import { testConfig } from "@testConfig";
import { Request, expect, request } from "@playwright/test";
import { Brands } from "@brands";

/*
{0} - locale
{1} - brand
{2} - year
*/
let getAllModelsEndpoint = (locale: string, brand: string, year:string) => 
`${locale}/api/configurator/sitewholegood/getallmodels/${brand}/${year}`;

export interface Variant {
    WholegoodNameHeading: string;
        PageUrl: string;
        Price: number;
        IsConfigurable: boolean;
        IsVisible: boolean;
        IsPublished: boolean;
        BuildURL: string;
}

export interface Products {
    WholegoodNameHeading: string;
        PageUrl: string;
        Variants: Variant[];
        IsVisible: boolean;
        IsConfigurable: boolean;
        IsPublished: boolean;
}

class ApiData {

    async getApiBuildUrl(locale: string = 'en-us', brand: string): Promise<string> {
        let urls: string[] = [];
        urls = await this.getApiAllBuildUrl(locale, brand);
        const singleUrl = urls[Math.floor(Math.random() * urls.length)];
        return singleUrl;
    }

    async getApiPreviousYearBuildUrl(locale: string = 'en-us', brand: string): Promise<string> {
        let urls: string[] = [];
        urls = await this.getApiAllPreviousYearBuildUrl(locale, brand);
        const singleUrl = urls[Math.floor(Math.random() * urls.length)];
        return singleUrl;
    }

    async getApiAllBuildUrl(locale: string = 'en-us', brand: string): Promise<string[]> {
        const urls: string[] = [];
        const endpoint = getAllModelsEndpoint(locale, brand, testConfig.currentYears[brand]);
        const responseContent = await this.sendGetRequest(endpoint);
        const productObjects: Products[] = await JSON.parse(responseContent);
        const products = await productObjects
        .filter(x => {
            return x.IsConfigurable && x.IsPublished && x.IsVisible && x.Variants.length > 0 && x.PageUrl.length > 0 
        });

        const variants = await products.filter(x => x.Variants
            .filter(x => {
                return x.BuildURL.length > 0 && x.PageUrl.length > 0
            })
            .map(x => {
                if(x.BuildURL)
                {
                    if(Brands.orv.includes(brand)) {
                        urls.push(`${testConfig.baseUrl}${x.BuildURL.replace(/^\//, '')}`);
                    } else if(Brands.boats.includes(brand)) {
                        if(x.BuildURL.includes('build-color')) {
                            urls.push(`${x.BuildURL.replace(/^\//, '')}`);
                        }
                    } 
                    else {
                        urls.push(`${x.BuildURL.replace(/^\//, '')}`);
                    }
                }
            }));
            return urls;
    }

    async getApiAllPreviousYearBuildUrl(locale: string = 'en-us', brand: string): Promise<string[]> {
        const urls: string[] = [];
        const endpoint = getAllModelsEndpoint(locale, brand, testConfig.previousYears[brand]);
        const responseContent = await this.sendGetRequest(endpoint);
        const productObjects: Products[] = await JSON.parse(responseContent);
        const products = await productObjects
        .filter(x => {
            return x.IsConfigurable && x.IsPublished && x.IsVisible && x.Variants.length > 0 && x.PageUrl.length > 0 
        });

        const variants = await products.filter(x => x.Variants
            .filter(x => {
                return x.BuildURL.length > 0 && x.PageUrl.length > 0
            })
            .map(x => {
                if(x.BuildURL.includes('CatalogContent'))
                {
                    if(Brands.orv.includes(brand) && !(x.BuildURL.includes('container'))) {
                        urls.push(`${testConfig.baseUrl}${x.BuildURL.replace(/^\//, '')}`);
                    } else if(Brands.boats.includes(brand)) {
                        if(x.BuildURL.includes('build-color')) {
                            urls.push(`${x.BuildURL.replace(/^\//, '')}`);
                        }
                    } 
                    else {
                        urls.push(`${x.BuildURL.replace(/^\//, '')}`);
                    }
                }
            }));
            return urls;
    }

    async sendGetRequest(endpoint: string): Promise<string> {
        const context = await request.newContext({baseURL: testConfig.baseUrl});
        const response = await context.get(endpoint);
        expect(response, `Api response not successfull: ${response.url}`).toBeOK();
        return await response.text();
    }
}

export default new ApiData();