import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/ui/shared/shared.module';


@Component({
  selector: 'app-sesions',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './sesions.component.html',
  styleUrl: './sesions.component.css'
})
export class SesionsComponent {
  @Input() datas:any[] = [];

}
