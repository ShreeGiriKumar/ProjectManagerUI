import {Location} from "@angular/common";
import { Component } from '@angular/core';
import { TestBed, async,fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from 'src/app/UI/addtask/addtask.component';
import { EditComponent } from 'src/app/UI/edittask/edittask.component';
import { ViewComponent } from 'src/app/UI/viewtask/viewtask.component';
import { UserComponent } from 'src/app/UI/user/user.component';
import { ProjectComponent } from 'src/app/UI/project/project.component';
import { MenuComponent } from 'src/app/ui/menu/menu.component';
import { FormsModule } from '@angular/forms';
import {Router, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'AddTask', component: AddComponent },
  { path: 'EditTask', component: EditComponent },
  { path: 'ViewTask', component: ViewComponent },
  { path: 'EditTask/:id', component: EditComponent },
  { path: 'User', component: UserComponent },
  { path: 'Project', component: ProjectComponent },  
  { path: '', redirectTo: '/AddTask', pathMatch: 'full' }
];

describe('AppComponent', () => {
  
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddComponent,
        ViewComponent,
        EditComponent,
        MenuComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        HttpClientModule
      ],
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  


  it('should have proper menu options', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li:nth-child(n+1) a').textContent).toContain('Add Task');
    expect(compiled.querySelector('li:nth-child(n+2) a').textContent).toContain('View Task');
  }));

  it('navigate to "" redirects you to /Add', fakeAsync(() => {
    router.navigate(['']);
    tick(50);
    expect(location.path()).toBe('/Add');
  }));

  it('navigate to "" redirects you to /View', fakeAsync(() => {
    router.navigate(['/View']);
    tick(50);
    expect(location.path()).toBe('/View');
  }));

});
