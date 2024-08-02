import { Injectable } from "@angular/core";
import { AuthService } from "@core/services/auth-service.interface";
import { environment, resources } from "@env/environment";
import { HttpService } from "@infrastructure/http/http.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthRepository extends AuthService {
  baseUrl = `${environment.identityAppUrl}${environment.apiSuffix}${resources.auth}`;
  constructor(protected httpService: HttpService) {
    super();
  }

  override send_otp(): Observable<void> {
    return this.httpService.doPost<any, void>(`${this.baseUrl}/sendotp`, {
      type: "ChangePassword",
    });
  }
  override logout(id: string): Observable<void> {
    return this.httpService.doDelete<void>(`${this.baseUrl}/logout`);
  }
}
