import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormerVicarsComponent } from './former-vicars.component';

describe('FormerVicarsComponent', () => {
  let component: FormerVicarsComponent;
  let fixture: ComponentFixture<FormerVicarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormerVicarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormerVicarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
