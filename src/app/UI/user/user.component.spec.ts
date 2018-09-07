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
      declarations: [ UserComponent, SortingPipe ],
      providers: [        
        { provide: SharedService, useClass: SharedMockService }
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents().then(()=>{
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
});
