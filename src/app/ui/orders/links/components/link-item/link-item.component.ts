import { Content } from "./../../../../contents/components/content";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Link } from "@core/models/orders/link.model";
import { LanguageService } from "@core/services/language-service.interface";
import { LinkService } from "@core/services/link-service.interface";
import { Option } from "src/app/ui/shared/ftx-autocomplete/type/option.interface";
import { NotificationService } from "src/app/ui/shared/services/notification.service";

@Component({
  selector: "app-link-item",
  templateUrl: "./link-item.component.html",
  styleUrl: "./link-item.component.css",
})
export class LinkItemComponent implements OnInit, OnChanges {
  @Input() link!: Link;
  @Input() contents: Content[] = [];
  options!: Option[];
  isSelect: boolean = false;
  loading: boolean = false;
  constructor(
    private linkService: LinkService,
    private languageService: LanguageService,
    private notificationService: NotificationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.contents) {
      this.options = this.contents.map((content) => {
        return { id: content.id, value: content.tag };
      });
    }
  }
  selectContent() {
    this.isSelect = !this.isSelect;
  }

  ngOnInit() {}

  async assign(event: any) {
    this.loading = true;
    this.selectContent();
    const option: Option = event.option.value;
    const content: Content = { id: option.id, tag: option.value };
    if (!this.link.content && !content.id) {
      this.loading = false;
      return;
    }
    if (!this.link.content) {
      await this.assignContent(content);
      return;
    }
    if (this.link.content.id != content.id) {
      await this.assignContent(content);
    } else {
      this.loading = false;
    }
  }

  assignContent(content: Content) {
    this.linkService.assignOne(this.link.id, { content: content }).subscribe({
      next: () => {
        if (content.tag) {
          this.notificationService.showSuccess(
            this.languageService.translateKey("CONTENT_ASSIGN_SUCCESS")
          );
        } else {
          this.notificationService.showSuccess(
            this.languageService.translateKey("CONTENT_UNLINK_SUCCESS")
          );
        }

        this.link.content = content;
        this.loading = false;
      },
      error: () => {
        this.notificationService.showError(
          this.languageService.translateKey("CONTENT_ASSIGN_ERROR")
        );

        this.loading = false;
      },
    });
  }
}
