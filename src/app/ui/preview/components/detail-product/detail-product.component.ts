import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule , MdbCarouselModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  @Input() photos:any[] = [];
  @Input() data = [];
  show: boolean = false;
  toggleDropdown() {
    this.show = !this.show;
  }

}
