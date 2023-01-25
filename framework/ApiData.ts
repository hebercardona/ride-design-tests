import { testConfig } from "@testConfig";
import { Request, expect, request } from "@playwright/test";

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

    async getCurrentYearResponse(locale: string = 'en-us', brand: string): Promise<string> {
        const endpoint = getAllModelsEndpoint(locale, brand, testConfig.currentYears[brand]);
        const responseContent = await this.sendGetRequest(endpoint);
        const productObjects: Products[] = await JSON.parse(responseContent);
        const productsWithVariants: Products[] = await productObjects
        .filter(x => x.IsConfigurable && x.IsPublished && x.IsVisible && x.Variants.length > 0);

        const urls: string[] = [];

        const products = await productObjects
        .filter(x => x.IsConfigurable && x.IsPublished && x.IsVisible && x.Variants.length > 0);

        const variants = await products.filter(x => x.Variants
            .filter(x => x.BuildURL != null && x.PageUrl != null)
            .map(x => {
                urls.push(x.BuildURL);
            }));
        
        return responseContent;
    }

    async sendGetRequest(endpoint: string): Promise<string> {
        const context = await request.newContext({baseURL: testConfig.baseUrl});
        const response = await context.get(endpoint);
        expect(response, `Api response not successfull: ${response.url}`).toBeOK();
        return await response.text();
    }
}

export default new ApiData();