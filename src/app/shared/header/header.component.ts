import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); 
  }

  ngOnDestroy() {
      window.removeEventListener('scroll', this.scroll, true);

  }

  scroll = (event: any): void => {
    let selectHeader = document.querySelector('#header')
    if (selectHeader) {
      if (window.scrollY > 150) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
  };

}
