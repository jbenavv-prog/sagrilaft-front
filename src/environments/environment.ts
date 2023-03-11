// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiUrlUniversal = 'https://www.universal-tutorial.com/api/';

export const environment = {
  production: false,
  // apiUrl: 'https://sagrilaft.comware.com.co:8447',
  apiUrl: 'http://localhost:8444',
  apiUrlPaises: 'https://restcountries.eu/rest/v2',
  apiUrlToken: `${apiUrlUniversal}getaccesstoken`,
  apiUrlCountries: `${apiUrlUniversal}countries/`,
  apiUrlStates: `${apiUrlUniversal}states/`,
  apiUrlCities: `${apiUrlUniversal}cities/`,
  APITOKEN_CITIES_SAGRILAFT: 'ILgSp7qVl5_hSBqZE_obUNN6Cv-1dAvvPNa_KVBdgtH2I2MFShohB7xhS9mnMsfiAnI',
  EMAIL_CITIES_SAGRILAFT: 'correoj94@gmail.com',
  CAPTCHA_SITE_KEY: '6Ldi0c8ZAAAAAIEhziVBvxogKCEEbO0nJ-8tmeJa',

  PUBLIC_API_KEY_TOKEN_CUSTOMERS_CREATE: '0ca81581ad729b89a6481fb1ef8f2048e794ae3d39213af8c65691ca4db0af32',
  PUBLIC_API_KEY_TOKEN_CUSTOMERS_UPDATE: '90aac82a6052b9826ae7ab20da0088a19d3eacefcabaa9a0aeaf73637af28839',
  ADMIN_API_KEY_TOKEN: 'bdae323ba9c256e7dcfeb2d4999b20597bfb7cd9d66677fab44ff5ea2483d36f',

  APYKEY_TOKEN_PROVEEDOR: '44538857b9ae26668ce34aab7a97462be9ec489ba51ab32b5a4fd4f54fd0697a',
  APYKEY_TOKEN_ADMINISTRADOR: '2065b49293c5c1cd16e46c48e9ef49309735c324663a7159bfdca0ae633d76e2',
};
export const OAuthSettings = {
  appId: '0f7fdce8-32e5-4d29-a47e-3daf8f3a33e1',
  scopes: [
    'user.read'
  ]
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
