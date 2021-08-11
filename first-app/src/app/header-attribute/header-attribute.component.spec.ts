import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAttributeComponent } from './header-attribute.component';

describe('HeaderAttributeComponent', () => {
  let component: HeaderAttributeComponent;
  let fixture: ComponentFixture<HeaderAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAttributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
