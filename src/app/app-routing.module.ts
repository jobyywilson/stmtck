import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventsComponent } from './components/events/events.component';
import { FormerVicarsComponent } from './components/former-vicars/former-vicars.component';
import { FoundersComponent } from './components/founders/founders.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { OfficeComponent } from './components/office/office.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { ParishVicarComponent } from './components/parish-vicar/parish-vicar.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'parish-vicar', component: ParishVicarComponent },
  { path: 'former-vicar', component: FormerVicarsComponent },
  { path: 'founders', component: FoundersComponent },
  { path: 'organisation', component: OrganisationComponent },
  { path: 'office', component: OfficeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:type/:id', component: EventDetailsComponent },
  
  
  {path: '**', redirectTo: '/home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
