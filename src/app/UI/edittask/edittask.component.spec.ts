import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { EditComponent } from './edittask.component';
import { TaskDO } from 'src/app/Model/task';
import { SharedService } from 'src/app/Services/shared.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { dispatchEvent } from '@angular/core/src/view/util';
import { SharedMockService } from 'src/test/shared-mock.service';
import { convertToParamMap } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditComponent
      ],
      providers: [
        { provide: SharedService, useClass: SharedMockService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '12'
              })
            }
          }
        }
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(EditComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get the task', () => {
    expect(component).toBeTruthy();
  });

  it('should set slider span to chosen slidervalue', () => {
    expect(component.sliderVal).toBeUndefined();
    component.priority = 12;
    component.show_value(component.priority);
    expect(component.sliderVal).toBe(12);
  });

  it('should reset the UI fields', () => {
    component.taskName = "Task 1";
    component.startDate = "2017-11-12";
    component.resetFields();
    expect(component.taskName).toEqual('');
    expect(component.startDate).toBeNull();
  });

  it('should update the parent task',() => {
    fixture.detectChanges();
    fixture.whenStable().then(()=>{

      let projectTitle = fixture.debugElement.query(By.css('#Project'));      
      projectTitle.nativeElement.value = 'Cloud Transformation';
      projectTitle.nativeElement.dispatchEvent(new Event('input'));

      let taskName = fixture.debugElement.query(By.css('#TaskName'));      
      taskName.nativeElement.value = 'Task 11';
      taskName.nativeElement.dispatchEvent(new Event('input'));

      let parentTask = fixture.debugElement.query(By.css('#parentChk'));      
      parentTask.nativeElement.value = true;
      parentTask.nativeElement.dispatchEvent(new Event('input'));

      let btnUpdTask = fixture.debugElement.query(By.css('#btnUpdate'));
      btnUpdTask.nativeElement.click();  
    });
  }); 

  it('should update the task',() => {
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

      let btnUpdTask = fixture.debugElement.query(By.css('#btnUpdate'));
      btnUpdTask.nativeElement.click();  

    });
  }); 

});
