import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NegotiationComponent } from "./negotiation.component";
import { NegotiationRouingModule } from "./negotiation-rouing.module";
import { SharedModule } from "../shared/shared.module";
import { HttpService } from "@infrastructure/http/http.service";
import { SessionService } from "@core/services/session-service.interface";
import { SessionRepository } from "@infrastructure/repositories/session.repository";
import { UserService } from "@core/services/user-service.interface";
import { UserRepository } from "@infrastructure/repositories/user.repository";

@NgModule({
  declarations: [NegotiationComponent],
  imports: [CommonModule, NegotiationRouingModule, SharedModule],
  providers: [
    HttpService,
    { provide: SessionService, useClass: SessionRepository },
    { provide: UserService, useClass: UserRepository },
  ],
})
export class NegotiationModule {}
