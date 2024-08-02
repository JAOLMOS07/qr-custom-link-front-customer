import { RouterModule, Routes } from "@angular/router";
import { NEGOTIATIONS } from "../routes.constants";
import { NegotiationComponent } from "./negotiation.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: "", component: NegotiationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegotiationRouingModule {}
