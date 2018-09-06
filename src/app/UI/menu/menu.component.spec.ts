import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct href url in menu',() => {
    let href1 = fixture.debugElement.nativeElement.querySelector('li:nth-child(n+1) a').getAttribute('routerLink');
    expect(href1).toEqual('/Add');
    let href2 = fixture.debugElement.nativeElement.querySelector('li:nth-child(n+2) a').getAttribute('routerLink')
    expect(href2).toEqual('/View');
  });

});
