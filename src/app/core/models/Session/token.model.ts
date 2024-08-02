export class Token {
  token: string;
  acceptedTermsAndConditions: boolean;
  firstTimeLogin: boolean;
  rol: string;
  companyId: string;
  userId: string;
  fullName:string;
  constructor(
    token: string,
    acceptedTermsAndConditions: boolean,
    firstTimeLogin: boolean,
    rol: string,
    companyId: string,
    userId: string, 
    fullName:string
  ) {
    this.token = token;
    this.acceptedTermsAndConditions = acceptedTermsAndConditions;
    this.firstTimeLogin = firstTimeLogin;
    this.rol = rol;
    this.companyId = companyId;
    this.userId = userId;
    this.fullName = fullName
  }
}
