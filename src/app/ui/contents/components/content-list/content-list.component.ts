import { Component, OnInit } from "@angular/core";
import { Content } from "../content";
import { ContenService } from "@core/services/content-service.interface";
import { SearchService } from "src/app/ui/shared/services/search.service";
@Component({
  selector: "app-content-list",
  templateUrl: "./content-list.component.html",
  styleUrl: "./content-list.component.css",
})
export class ContentListComponent implements OnInit {
  totalItems = 50;
  itemsPerPage = 5;
  currentPage = 1;
  isLoadign: boolean = false;
  pageSizeOptions = [5, 10, 15];
  public contents: Content[] = [];
  dataSearch: string = "";
  public isLoading = false;
  constructor(
    private contentService: ContenService,
    private searchService: SearchService
  ) {
    this.searchService.getEventEmitter("contents").subscribe((data) => {
      this.dataSearch = data;
      this.currentPage = 1;
      this.fetchContents(this.currentPage, this.itemsPerPage, this.dataSearch);
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.fetchContents(this.currentPage, this.itemsPerPage, this.dataSearch);
  }
  public fetchContents(
    pageNumber: number,
    pageSize: number,
    filter?: string
  ): void {
    this.isLoading = true;

    this.contentService
      .getAllContentPaginated(pageNumber, pageSize, filter)
      .subscribe({
        next: (result) => {
          this.isLoading = false;
          this.contents = result.data;
          this.totalItems = result.totalCount;
          this.itemsPerPage = result.pageSize;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
  public contentPaginated!: any[];
  ngOnInit(): void {
    this.currentPage = 1;
    this.fetchContents(this.currentPage, this.itemsPerPage, this.dataSearch);
  }
}
