import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeBeatersComponent } from './office-beaters.component';

describe('OfficeBeatersComponent', () => {
  let component: OfficeBeatersComponent;
  let fixture: ComponentFixture<OfficeBeatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeBeatersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeBeatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
