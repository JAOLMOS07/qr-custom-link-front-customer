import { Routes } from "@angular/router";
import { NEGOTIATIONS } from "./routes.constants";
import { SessionRepository } from "@infrastructure/repositories/session.repository";

export const routes: Routes = [
  {
    path: "principal",
    providers: [SessionRepository],
    loadChildren: () =>
      import("./principal/principal.module").then((m) => m.PrincipalModule),
  },
  {
    path: `${NEGOTIATIONS.NAME}/${NEGOTIATIONS.NEGOTIATIONS}`,
    providers: [SessionRepository],
    loadChildren: () =>
      import("./negotiation/negotiation.module").then(
        (m) => m.NegotiationModule
      ),
  },
  {
    path: "",
    redirectTo: `${NEGOTIATIONS.NAME}/${NEGOTIATIONS.NEGOTIATIONS}`,
    pathMatch: "prefix",
  },
];
