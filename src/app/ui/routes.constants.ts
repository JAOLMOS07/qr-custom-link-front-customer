import { Order } from "./../core/models/orders/order.model";
export const CONTENTS = {
  NAME: "content",
  CONTENT: "content",
  NEW_CONTENT: "new",
  PREVIEW_CONTENT: "qr/:id",
  ASSIGN_CONTENT: "assign",
};

export const ORDERS = {
  NAME: "orders",
  ORDER: "order",
  LINKS: "links",
  ORDER_SERVICE: "order-service",
};
export const AUTHENTICATION = {
  NAME: "auth",
  LOGIN: "login",
  UPDATE_PASSWORD: "update-password",
  OTP: "otp",
  TERMS_AND_CONDITIONS: "terms-and-conditions",
};
export const NEGOTIATIONS = {
  NAME: "negotiation",
  NEGOTIATIONS: "negotiations",
};
export const USERS = {
  NAME: "users",
  USER: "user",
  CREATE: "create",
};
export const PRINCIPAL = {
  NAME: "principal",
  HOME: "home",
};
export const MODULES = {
  CONTENTS: {
    CONTENT: `/${PRINCIPAL.NAME}/${CONTENTS.NAME}/${CONTENTS.CONTENT}`,
    NEW_CONTENT: `/${PRINCIPAL.NAME}/${CONTENTS.NAME}/${CONTENTS.NEW_CONTENT}`,
    ASSIGN_CONTENT: `/${PRINCIPAL.NAME}/${CONTENTS.ASSIGN_CONTENT}`,
  },
  USERS: {
    USER: `/${PRINCIPAL.NAME}/${USERS.NAME}/${USERS.USER}`,
    CREATE: `/${PRINCIPAL.NAME}/${USERS.NAME}/${USERS.CREATE}`,
  },

  AUTHENTICATION: {
    LOGIN: `/${AUTHENTICATION.NAME}/${AUTHENTICATION.LOGIN}`,
    UPDATEPASSWORD: `/${AUTHENTICATION.NAME}/${AUTHENTICATION.UPDATE_PASSWORD}`,
    OTP: `/${AUTHENTICATION.NAME}/${AUTHENTICATION.OTP}`,
    TERMS_AND_CONDITIONS: `/${AUTHENTICATION.NAME}/${AUTHENTICATION.TERMS_AND_CONDITIONS}`,
  },
  ORDERS: {
    ORDER_SERVICE: `/${PRINCIPAL.NAME}/${ORDERS.NAME}/${ORDERS.ORDER}`,
    LINKS: `/${PRINCIPAL.NAME}/${ORDERS.NAME}/${ORDERS.LINKS}`,
  },
  HOME: {
    HOME: `/${PRINCIPAL.NAME}/${PRINCIPAL.HOME}`,
  },
  NEGOTIATIONS: {
    NEGOTIATION: `/${NEGOTIATIONS.NAME}/${NEGOTIATIONS.NEGOTIATIONS}`,
  },
};
