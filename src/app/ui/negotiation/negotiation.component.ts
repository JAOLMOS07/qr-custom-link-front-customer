import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Token } from "@core/models/Session/token.model";
import { SessionService } from "@core/services/session-service.interface";
import { MODULES } from "../routes.constants";
import { environment } from "@env/environment";
import { debounceTime } from "rxjs";
@Component({
  selector: "app-negotiation",
  templateUrl: "./negotiation.component.html",
  styleUrl: "./negotiation.component.css",
})
export class NegotiationComponent implements OnInit {
  datsoSession: any = [];
  token!: Token;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.pipe(debounceTime(1000)).subscribe((params) => {
      const sessionData = params["datos"];
      if (sessionData) {
        this.sessionService.deleteToken();
        const decodedSessionData = decodeURIComponent(sessionData);
        const data = JSON.parse(decodedSessionData);
        localStorage.setItem("token", JSON.stringify(data));
      }
      if (this.sessionService.isLoggedIn()) {
        this.router.navigate([MODULES.CONTENTS.CONTENT]);
      } else {
        window.location.href = `${environment.frontIdentityAppUrl}/auth/login`;
      }
    });
  }

  readonly MODULES = MODULES;
}
