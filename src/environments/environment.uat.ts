export const environment = {
  production: false,
  appConfig: "uat",
  pathConfig: "./assets/config",
  apiSuffix: "/api/v1/",
  companyAppUrl:
    "https://az-qrcustomlink-back-company-appservice-dev.azurewebsites.net",
  contentAppUrl:
    "https://az-qrcustomlink-back-content-appservice-dev.azurewebsites.net",
  orderAppUrl:
    "https://az-qrcustomlink-back-order-appservice-dev.azurewebsites.net",
  linkAppsUrl:
    "https://az-qrcustomlink-back-link-appservice-dev.azurewebsites.net",
  identityAppUrl:
    "https://az-qrcustomlink-back-identity-appservice-dev.azurewebsites.net",
  frontIdentityAppUrl: "https://jolly-water-0eb08d710.4.azurestaticapps.net",
};

export const resources = {
  company: "companies",
  commercialSegments: "commercial-segments",
  documentTypes: "document-types",
  content: "contents",
  user: "users",
  order: "orders",
  auth: "auth",
  link: "links",
};
