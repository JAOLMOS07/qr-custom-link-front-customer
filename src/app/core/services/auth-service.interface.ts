import { Observable } from "rxjs";

export abstract class AuthService {
  abstract send_otp(): Observable<void>;
  abstract logout(id: string): Observable<void>;
}
