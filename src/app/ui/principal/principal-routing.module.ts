import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SessionRepository } from "@infrastructure/repositories/session.repository";
import { sessionGuard } from "@infrastructure/session.guard";
import {
  CONTENTS,
  NEGOTIATIONS,
  ORDERS,
  PRINCIPAL,
  USERS,
} from "../routes.constants";
import { AssignComponent } from "../assign/assign.component";
import { PrincipalComponent } from "./principal.component";
import { sessionAdministratorGuard } from "@infrastructure/sessionAdministrator.guard";

const routes: Routes = [
  {
    path: "",
    component: PrincipalComponent,
    children: [
      {
        path: CONTENTS.NAME,
        providers: [SessionRepository],
        canMatch: [sessionGuard],
        loadChildren: () =>
          import("../contents/contents.module").then((m) => m.ContentsModule),
      },
      {
        path: CONTENTS.ASSIGN_CONTENT,
        providers: [SessionRepository],
        canMatch: [sessionGuard],
        component: AssignComponent,
        data: { showMenu: true },
      },

      {
        path: ORDERS.NAME,
        providers: [SessionRepository],
        canMatch: [sessionGuard],
        loadChildren: () =>
          import("../orders/orders.module").then((m) => m.OrdersModule),
      },

      {
        path: "",
        redirectTo: `${CONTENTS.NAME}`,
        pathMatch: "prefix",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalRoutingModule {}
