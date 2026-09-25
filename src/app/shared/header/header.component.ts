import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private routerSubscription?: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); 
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeNavBar();
      }
    });
  }

  ngOnDestroy() {
      window.removeEventListener('scroll', this.scroll, true);
      this.routerSubscription?.unsubscribe();
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

  toggleDropdown(){
    const dropDown = document.getElementsByClassName('ul-dropdown')[0];
    if(dropDown.classList.contains('dropdown-active')){
      dropDown.classList.remove('dropdown-active')
    }else{
      dropDown.classList.add('dropdown-active')
    }
    
    
  }
  
  toggleNavBar(){
    let navbarElement: HTMLElement = document.getElementsByClassName( 'navbar' )[ 0 ] as HTMLElement;
    if(navbarElement.classList.contains('navbar-mobile')){
      navbarElement.classList.remove('navbar-mobile');
    }else{
      navbarElement.classList.add('navbar-mobile');
    }
    let navBarMobile = document.querySelector<HTMLElement>( '.mobile-nav-toggle i' );
    navBarMobile?.classList.toggle('bi-list')
    navBarMobile?.classList.toggle('bi-x')
  }

  closeNavBar(): void {
    const navbarElement = document.getElementsByClassName('navbar')[0] as HTMLElement | undefined;
    navbarElement?.classList.remove('navbar-mobile');

    const navBarMobile = document.querySelector<HTMLElement>('.mobile-nav-toggle i');
    navBarMobile?.classList.remove('bi-x');
    navBarMobile?.classList.add('bi-list');

    document.querySelector('.ul-dropdown')?.classList.remove('dropdown-active');
  }

}
