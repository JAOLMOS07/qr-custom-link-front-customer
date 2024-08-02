import { Component, OnInit, ViewChild } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { OrderService } from "@core/services/order-service.interface";
import { OrderRepository } from "@infrastructure/repositories/order.repository";
import { HttpService } from "@infrastructure/http/http.service";
import { Assign } from "@core/models/contents/assign.model";
import { NotificationService } from "../shared/services/notification.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TableColumn } from "../shared/components/ftx-table/models/table-column.model";
import { LinkService } from "@core/services/link-service.interface";
import { LinkRepository } from "@infrastructure/repositories/link.repository";
import { LanguageService } from "@core/services/language-service.interface";
import { LanguageStore } from "@infrastructure/i18n/language-store.service";
import { CoreModule } from "@core/core.module";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-assign",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    FormsModule,
    CommonModule,
    CoreModule,
    TranslateModule,
  ],
  providers: [
    HttpService,
    { provide: OrderService, useClass: OrderRepository },
    { provide: LinkService, useClass: LinkRepository },
    { provide: LanguageService, useClass: LanguageStore },
  ],
  templateUrl: "./assign.component.html",
  styleUrl: "./assign.component.css",
})
export class AssignComponent implements OnInit {
  displayedColumns: string[] = [
    "ordenes",
    "cantTotal",
    "cantRestante",
    "asignar",
    "accion",
  ];
  dataSource!: MatTableDataSource<any[]>;
  filterValue: string = "";
  loading: boolean = false;
  filter: string = "";
  ordersTableColumns!: TableColumn[];
  elementosPorPagina: number = 5;
  totalElementos = 0;
  defaultPageSize = 5;
  pageIndex = 1;
  paginaActual = 1;
  companyId: any = "";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  datosEntrada: any = [];
  dataOrder: any;
  tagName: string = "";

  constructor(
    private linkService: LinkService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    let dataString = localStorage.getItem("orders");
    if (dataString !== null) {
      this.datosEntrada = JSON.parse(dataString);
      localStorage.removeItem("orders");
      this.tagName = this.datosEntrada.tag;
      this.initColumns();
    }
  }

  async initColumns(): Promise<void> {
    this.ordersTableColumns = [
      {
        name: this.languageService.translateKey("ORDERS"),
        dataKey: "productionOrder",
      },
      {
        name: this.languageService.translateKey("TOTAL_QUANTITY"),
        dataKey: "amountQr",
      },
      {
        name: this.languageService.translateKey("REMAINING_AMOUNT"),
        dataKey: "amountAvailable",
      },
    ];
    await this.findOrder();
  }

  async findOrder() {
    this.loading = true;
    await this.orderService
      .findOrder(this.pageIndex, this.elementosPorPagina, this.filter)
      .subscribe(
        (result) => {
          this.dataOrder = result.data;
          this.dataSource = new MatTableDataSource(this.dataOrder);
          this.defaultPageSize = result.pageSize;
          this.totalElementos = result.totalCount;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error("Error al obtener órdenes:", error);
        }
      );
  }
  getTitleTranslate(tagName: string): string {
    return this.languageService.translateKey("LINK_UP", { tagName: tagName });
  }
  assign(row: any) {
    this.loading = true;
    const assign: Assign = {
      content: { id: this.datosEntrada.id, tag: this.datosEntrada.tag },
      amountToAssociate: row.assignedQuantity,
    };
    if (row.assignedQuantity > 0) {
      if (row.amountAvailable >= row.assignedQuantity) {
        this.linkService.assign(row.id + "", assign).subscribe(
          (result) => {
            this.loading = false;
            this.notificationService.showSuccess(
              this.languageService.translateKey("CONTENT_ASSIGN_SUCCESS")
            );
            this.findOrder();
          },
          (error) => {
            this.loading = false;
            this.notificationService.showError(
              this.languageService.translateKey("CONTENT_ASSIGN_ERROR")
            );
          }
        );
      } else {
        this.loading = false;
        this.notificationService.showError(
          this.languageService.translateKey("AMOUNT_GREATER_ERROR")
        );
      }
    } else {
      this.loading = false;
      this.notificationService.showError(
        this.languageService.translateKey("ZERO_AMOUNT_ERROR")
      );
    }
  }

  applyFilter(event: Event) {
    this.pageIndex = 1;
    this.findOrder();
  }

  pagination(evento: any) {
    this.elementosPorPagina = evento.pageSize;
    this.pageIndex = evento.pageIndex + 1;
    this.findOrder();
  }
}
