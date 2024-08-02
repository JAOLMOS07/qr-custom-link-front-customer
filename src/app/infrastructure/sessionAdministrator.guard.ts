import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { SessionRepository } from "./repositories/session.repository";
import { environment } from "@env/environment";

export const sessionAdministratorGuard: CanActivateFn = (route, state) => {
  const service = inject(SessionRepository);
  const session = service.getToken();
  if (session) {
    if (!service.isLoggedIn()) {
      return false;
    }
  } else {
    window.location.href = `${environment.frontIdentityAppUrl}/auth/login`;
    return false;
  }
  return session?.rol === "AdministratorCustomer";
};
