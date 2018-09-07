import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { TaskDO } from 'src/app/Model/task';
import { AddComponent } from './addtask.component';
import { SharedService } from 'src/app/Services/shared.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchEvent } from '@angular/core/src/view/util';
import { SharedMockService } from 'src/test/shared-mock.service';
import { Observable, Subject } from 'rxjs';
import { ProjectDO } from 'src/app/Model/project';
import { UserDO } from 'src/app/Model/user';
import { DatePipe } from '@angular/common';
import { ParentDO } from 'src/app/Model/parent';


describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddComponent
      ],
      providers: [        
        { provide: SharedService, useClass: SharedMockService }
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents().then(()=>{
        fixture = TestBed.createComponent(AddComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set slider span to chosen slidervalue',() => {    
    expect(component.sliderVal).toBeUndefined();
    component.priority = 12;
    component.show_value(component.priority);
    expect(component.sliderVal).toBe(12);
  });

  it('should reset the UI fields',() => {    
    component.resetFields();
    expect(component.taskName).toBeNull();
    expect(component.projectTitle).toEqual('');
    expect(component.parentTask).toBeNull();
    expect(component.startDate).toBe('2018-09-07');
    expect(component.endDate).toBe('2018-09-08');
  });

  it('should add a new task',() => {
    fixture.detectChanges();
    fixture.whenStable().then(()=>{

      let projectName = fixture.debugElement.query(By.css('#Project'));      
      projectName.nativeElement.value = 'Cloud Transformation';
      projectName.nativeElement.dispatchEvent(new Event('input'));

      let taskName = fixture.debugElement.query(By.css('#TaskName'));      
      taskName.nativeElement.value = 'Task 1';
      taskName.nativeElement.dispatchEvent(new Event('input'));

      let chkParent = fixture.debugElement.query(By.css('#parentChk'));      
      chkParent.nativeElement.value = false;
      chkParent.nativeElement.dispatchEvent(new Event('input'));

      let parentTask = fixture.debugElement.query(By.css('#ParentTask'));      
      parentTask.nativeElement.value = 'Parent Task 1';
      parentTask.nativeElement.dispatchEvent(new Event('select'));

      let taskPriority = fixture.debugElement.query(By.css('#TaskPriority'));      
      taskPriority.nativeElement.value = 10;
      taskPriority.nativeElement.dispatchEvent(new Event('input'));

      let startDate = fixture.debugElement.query(By.css('#StartDate'));      
      startDate.nativeElement.value = '2018-09-12';
      startDate.nativeElement.dispatchEvent(new Event('input'));

      let endDate = fixture.debugElement.query(By.css('#EndDate'));      
      endDate.nativeElement.value = '2018-09-14';
      endDate.nativeElement.dispatchEvent(new Event('input'));

      let user = fixture.debugElement.query(By.css('#User'));      
      user.nativeElement.value = 'Shree';
      user.nativeElement.dispatchEvent(new Event('input'));

      let addTaskBtn = fixture.debugElement.query(By.css('#btnAddTask'));
      addTaskBtn.nativeElement.click();  
    });
  });  

  it('should add a new parent task',() => {
    fixture.detectChanges();
    fixture.whenStable().then(()=>{

      let projectName = fixture.debugElement.query(By.css('#Project'));      
      projectName.nativeElement.value = 'Cloud Transformation';
      projectName.nativeElement.dispatchEvent(new Event('input'));

      let taskName = fixture.debugElement.query(By.css('#TaskName'));      
      taskName.nativeElement.value = 'Parent Task 1';
      taskName.nativeElement.dispatchEvent(new Event('input'));

      let parentTask = fixture.debugElement.query(By.css('#parentChk'));      
      parentTask.nativeElement.value = true;
      parentTask.nativeElement.dispatchEvent(new Event('input'));

      let addTaskBtn = fixture.debugElement.query(By.css('#btnAddTask'));
      addTaskBtn.nativeElement.click();  
    });
  }); 
});
