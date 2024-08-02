import { UserType } from "./user.type";

export class CreateUser {
  name: string;
  surName: string;
  email: string;
  rol: UserType;
  documentType: string;
  document: string;
  constructor(
    name: string,
    surName: string,
    email: string,
    rol: UserType,
    documentType: string,
    document: string
  ) {
    this.email = email;
    this.rol = rol;
    this.name = name;
    this.surName = surName;
    this.documentType = documentType;
    this.document = document;
  }
}

export class UpdatePassword {
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}
