import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesDropdownComponent } from './cities-dropdown.component';

describe('CityDetailComponent', () => {
  let component: CitiesDropdownComponent;
  let fixture: ComponentFixture<CitiesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitiesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitiesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
