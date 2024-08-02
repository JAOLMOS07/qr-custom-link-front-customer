import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "@core/models/orders/order.model";
import { LanguageService } from "@core/services/language-service.interface";
import { OrderService } from "@core/services/order-service.interface";
import { SearchService } from "src/app/ui/shared/services/search.service";
import { MODULES } from "src/app/ui/routes.constants";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrl: "./order-list.component.css",
})
export class OrderListComponent implements OnInit {
  ngOnInit(): void {
    this.currentPage = 1;
    this.fetchOrders(this.currentPage, this.itemsPerPage, this.dataSearch);
  }
  filter: string = "";
  dataSearch: string = "";

  totalItems = 50;
  itemsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15];
  orders: Order[] = [];
  public isLoading = false;

  constructor(
    private orderService: OrderService,
    private searchService: SearchService,
    private languageService: LanguageService,

    private router: Router
  ) {
    this.searchService.getEventEmitter("orders").subscribe((data) => {
      this.dataSearch = data;
      this.currentPage = 1;
      this.fetchOrders(this.currentPage, this.itemsPerPage, this.dataSearch);
    });
  }

  public fetchOrders(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): void {
    this.isLoading = true;

    this.orderService.findOrder(pageNumber, pageSize, filter).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.orders = result.data;
        this.totalItems = result.totalCount;
        this.itemsPerPage = result.pageSize;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  getTitleTranslate(title: string): string {
    return this.languageService.translateKey("ORDER_PRODUCTION", {
      title: title,
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.fetchOrders(this.currentPage, this.itemsPerPage, this.dataSearch);
  }
  public assign(order: Order) {
    localStorage.setItem("orders", JSON.stringify(order));
    this.router.navigate(["principal/orders/links"], {
      queryParams: {
        mensaje: JSON.stringify({ sku: order.productionOrder, id: order.id }),
      },
    });
  }
  protected readonly MODULES = MODULES;
}
