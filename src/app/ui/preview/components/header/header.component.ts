import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() logoUrl: string;
  @Input() languaje: string[] = [];
  @Output() eventChangeLanguage: EventEmitter<number> = new EventEmitter();

  currentLanguage: number = 0;

  flags: Array<any> = [{
    language: 'spanish',
    code: 'es',
    image: 'assets/colombia-icon.png'
  }, {
    language: 'english',
    code: 'en',
    image: 'assets/estados-unidos.png'
  }, {
    language: 'Japanese',
    code: 'ja',
    image: 'assets/japon.png'
  }];
  constructor() {
    this.logoUrl = "";
  }

  getCurrentLanguage() {
    if(this.languaje){
      if(this.languaje.length> this.currentLanguage) {
        return this.flags[this.currentLanguage].image
      }else{
        return this.flags[this.languaje.length-1].image
      }
    }

  }

  changeLanguage() {
    if (this.currentLanguage === (this.flags.length - 1)) {
      this.currentLanguage = 0;
    } else {
      this.currentLanguage++;
    }
    //this.eventChangeLanguage.emit(this.flags[this.currentLanguage].code);
    this.eventChangeLanguage.emit(this.currentLanguage);
  }
}
