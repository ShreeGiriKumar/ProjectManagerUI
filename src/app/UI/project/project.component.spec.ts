import { ProjectComponent } from './project.component';
import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { SharedService } from 'src/app/Services/shared.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchEvent } from '@angular/core/src/view/util';
import { SharedMockService } from 'src/test/shared-mock.service';
import { Observable, Subject } from 'rxjs';
import { ProjectDO } from 'src/app/Model/project';
import { UserDO } from 'src/app/Model/user';
import { DatePipe } from '@angular/common';
import { SortingPipe } from 'src/app/Pipe/sorting.pipe';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent, SortingPipe ],
      providers: [        
        { provide: SharedService, useClass: SharedMockService }
      ],
      imports: [
        FormsModule
      ]
    })    
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ProjectComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
