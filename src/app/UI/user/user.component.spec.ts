import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { SharedService } from 'src/app/Services/shared.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchEvent } from '@angular/core/src/view/util';
import { SharedMockService } from 'src/test/shared-mock.service';
import { UserDO } from 'src/app/Model/user';
import { SortingPipe } from 'src/app/Pipe/sorting.pipe';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent, SortingPipe],
      providers: [
        { provide: SharedService, useClass: SharedMockService }
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create user', () => {
    fixture.whenStable().then(() => {

      let firstName = fixture.debugElement.query(By.css('#FirstName'));
      firstName.nativeElement.value = 'Spec First Name';
      firstName.nativeElement.dispatchEvent(new Event('input'));

      let lastName = fixture.debugElement.query(By.css('#LastName'));
      lastName.nativeElement.value = 'Spec Last Name';
      lastName.nativeElement.dispatchEvent(new Event('input'));


      let employeeId = fixture.debugElement.query(By.css('#EmployeeID'));
      employeeId.nativeElement.value = 'Spec 123456';
      employeeId.nativeElement.dispatchEvent(new Event('input'));

      component.btnText = "Add User";

      let addProjectBtn = fixture.debugElement.query(By.css('#btnAddUser'));
      addProjectBtn.nativeElement.click();

      expect(component.filteredUsers.length).toEqual(2);
    });
  });

  it('should update user', () => {
    fixture.whenStable().then(() => {

      let firstName = fixture.debugElement.query(By.css('#FirstName'));
      firstName.nativeElement.value = 'Spec First Name';
      firstName.nativeElement.dispatchEvent(new Event('input'));

      let lastName = fixture.debugElement.query(By.css('#LastName'));
      lastName.nativeElement.value = 'Spec Last Name';
      lastName.nativeElement.dispatchEvent(new Event('input'));


      let employeeId = fixture.debugElement.query(By.css('#EmployeeID'));
      employeeId.nativeElement.value = 'Spec 123456';
      employeeId.nativeElement.dispatchEvent(new Event('input'));

      component.btnText = "Update User";

      let addProjectBtn = fixture.debugElement.query(By.css('#btnAddUser'));
      addProjectBtn.nativeElement.click();

      expect(component.filteredUsers.length).toEqual(1);
    });
  });

  it('should filter based on user name', () => {    
    fixture.whenStable().then(() => {
      let taskName = fixture.debugElement.query(By.css('#search'));
      taskName.nativeElement.value = 'Rohith';
      taskName.nativeElement.dispatchEvent(new Event('input'));
      taskName.nativeElement.dispatchEvent(new Event('blur'));            
      expect(component.filteredUsers.length).toBe(1);
    });
  });


  it('should reload when filters are cleared', () => {    
    fixture.whenStable().then(() => {
      let taskName = fixture.debugElement.query(By.css('#search'));
      taskName.nativeElement.value = 'Rohith';
      taskName.nativeElement.dispatchEvent(new Event('input'));
      taskName.nativeElement.dispatchEvent(new Event('blur'));            
      taskName.nativeElement.value = '';
      taskName.nativeElement.dispatchEvent(new Event('input'));
      taskName.nativeElement.dispatchEvent(new Event('blur'));            
      expect(component.filteredUsers.length).toBe(1);
    });
  });

});
