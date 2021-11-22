import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataService } from '../share/data.service';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let service: UserService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [UserService, DataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(UserService);
    dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    expect(service.user.name).toEqual(component.user.name);
  });

  it('should display the user name if user is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement;
    expect(element.querySelector('p').textContent).toContain(component.user.name);
  });

  it('should not display the user name if user isn\'t logged in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement;
    expect(element.querySelector('h1').textContent).toContain('User not logged in');
  });

  it('should\'t fetch data sucessfully if not called asynchronously', () => {
    expect(component.data).toBe(undefined);
  });

  it('should fetch data sucessfully if called asynchronously', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data');
    });
  }));
});
