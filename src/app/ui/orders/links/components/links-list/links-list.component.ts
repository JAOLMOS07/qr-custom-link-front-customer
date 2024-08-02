import { Component, Input, OnInit } from "@angular/core";
import { Link } from "@core/models/orders/link.model";
import { ContenService } from "@core/services/content-service.interface";
import { LinkService } from "@core/services/link-service.interface";
import { Content } from "src/app/ui/contents/components/content";
import { SearchService } from "src/app/ui/shared/services/search.service";
@Component({
  selector: "app-links-list",
  templateUrl: "./links-list.component.html",
  styleUrl: "./links-list.component.css",
})
export class LinksListComponent implements OnInit {
  @Input() orderId!: string;
  contents: Content[] = [];

  dataSearch: string = "";
  totalItems = 50;
  itemsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15];
  links: Link[] = [];
  public isLoading = false;
  public isLoadingContent = false;

  constructor(
    private linkService: LinkService,
    private contentService: ContenService,
    private searchService: SearchService
  ) {}
  ngOnInit(): void {
    this.searchService.getEventEmitter("links").subscribe((data) => {
      this.dataSearch = data;
      this.currentPage = 1;
      this.fetchLinks(this.currentPage, this.itemsPerPage, this.dataSearch);
      this.fetchAllContents();
    });
    this.currentPage = 1;
    this.fetchLinks(this.currentPage, this.itemsPerPage, this.dataSearch);
    this.fetchAllContents();
  }

  public fetchLinks(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): void {
    this.isLoading = true;
    this.linkService
      .getLinks(pageNumber, pageSize, this.orderId, filter)
      .subscribe({
        next: (result) => {
          this.links = result.data;
          this.totalItems = result.totalCount;
          this.itemsPerPage = result.pageSize;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
  public fetchAllContents() {
    this.isLoadingContent = true;
    this.contentService.getAllContent().subscribe({
      next: (data) => {
        this.contents = data;
        this.isLoadingContent = false;
      },
      error: () => {
        this.isLoadingContent = false;
      },
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.fetchLinks(this.currentPage, this.itemsPerPage, this.dataSearch);
  }
}
