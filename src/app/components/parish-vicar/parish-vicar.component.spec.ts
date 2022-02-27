import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishVicarComponent } from './parish-vicar.component';

describe('ParishVicarComponent', () => {
  let component: ParishVicarComponent;
  let fixture: ComponentFixture<ParishVicarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParishVicarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishVicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
