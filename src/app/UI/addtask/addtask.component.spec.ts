import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { TaskDO } from 'src/app/Model/task';
import { AddComponent } from './addtask.component';
import { SharedService } from 'src/app/Services/shared.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchEvent } from '@angular/core/src/view/util';
import { SharedMockService } from 'src/test/shared-mock.service';

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
    component.taskName = "Task 1";
    component.startDate = "2017-11-12";
    component.resetFields();
    expect(component.taskName).toEqual('');
    expect(component.startDate).toBeNull();
  });

  it('should add a new task',() => {
    fixture.detectChanges();
    fixture.whenStable().then(()=>{

      let taskName = fixture.debugElement.query(By.css('#TaskName'));      
      taskName.nativeElement.value = 'Task 1';
      taskName.nativeElement.dispatchEvent(new Event('input'));

      let parentTask = fixture.debugElement.query(By.css('#ParentTask'));      
      parentTask.nativeElement.value = 'Parent Task 1';
      parentTask.nativeElement.dispatchEvent(new Event('input'));

      let taskPriority = fixture.debugElement.query(By.css('#TaskPriority'));      
      taskPriority.nativeElement.value = 10;
      taskPriority.nativeElement.dispatchEvent(new Event('input'));

      let startDate = fixture.debugElement.query(By.css('#StartDate'));      
      startDate.nativeElement.value = '2018-09-12';
      startDate.nativeElement.dispatchEvent(new Event('input'));

      let endDate = fixture.debugElement.query(By.css('#EndDate'));      
      endDate.nativeElement.value = '2018-09-14';
      endDate.nativeElement.dispatchEvent(new Event('input'));

      let addTaskBtn = fixture.debugElement.query(By.css('#btnAddTask'));
      addTaskBtn.nativeElement.click();  
    });
  });  
});
