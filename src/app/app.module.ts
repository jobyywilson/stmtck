import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HistoryComponent } from './components/history/history.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ParishVicarComponent } from './components/parish-vicar/parish-vicar.component';
import { FormerVicarsComponent } from './components/former-vicars/former-vicars.component';
import { OfficeBeatersComponent } from './components/office-beaters/office-beaters.component';
import { FoundersComponent } from './components/founders/founders.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { OfficeComponent } from './components/office/office.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    HistoryComponent,
    AboutUsComponent,
    ParishVicarComponent,
    FormerVicarsComponent,
    OfficeBeatersComponent,
    FoundersComponent,
    OrganisationComponent,
    OfficeComponent,
    EventsComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
