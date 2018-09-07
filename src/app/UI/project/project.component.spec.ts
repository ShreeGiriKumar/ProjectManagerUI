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
 
  it('should add a project', () => {    
    fixture.whenStable().then(()=>{
      
      let projectName = fixture.debugElement.query(By.css('#Project'));      
      projectName.nativeElement.value = 'Cloud Transformation';
      projectName.nativeElement.dispatchEvent(new Event('input'));

      let setDateChk = fixture.debugElement.query(By.css('#DateDefCheck'));      
      setDateChk.nativeElement.value = true;
      setDateChk.nativeElement.dispatchEvent(new Event('input'));


      let startDate = fixture.debugElement.query(By.css('#StartDate'));      
      startDate.nativeElement.value = '2018-09-07';
      startDate.nativeElement.dispatchEvent(new Event('input'));

      let endDate = fixture.debugElement.query(By.css('#EndDate'));      
      endDate.nativeElement.value = '2018-09-08';
      endDate.nativeElement.dispatchEvent(new Event('input'));

      let taskPriority = fixture.debugElement.query(By.css('#TaskPriority'));      
      taskPriority.nativeElement.value = true;
      taskPriority.nativeElement.dispatchEvent(new Event('input'));

      let manager = fixture.debugElement.query(By.css('#Manager'));      
      manager.nativeElement.value = 'Rahul';
      manager.nativeElement.dispatchEvent(new Event('input'));

      component.btnText ="Add Project";
      
      let addProjectBtn = fixture.debugElement.query(By.css('#btnAddProject'));
      addProjectBtn.nativeElement.click();  
      
      expect(component.filteredProjects.length).toEqual(2);
    });    
  }); 

  it('should fetch all users & projects', () => {
    component.getAllProjects();
    component.getAllUsers();
    fixture.whenStable().then(()=>{
      expect(component.filteredUsers).toBeTruthy();
      expect(component.filteredProjects).toBeTruthy();
    });
  });

});
