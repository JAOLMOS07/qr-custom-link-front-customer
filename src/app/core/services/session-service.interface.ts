import { Token } from "@core/models/Session/token.model";

export abstract class SessionService {
  abstract getToken(): Token | null;
  abstract setToken(token: Token): void;
  abstract deleteToken(): void;
  abstract isLoggedIn(): boolean;
}
