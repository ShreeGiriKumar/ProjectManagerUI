import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponent } from './viewtask.component';
import { SharedService } from 'src/app/Services/shared.service';
import { SharedMockService } from 'src/test/shared-mock.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewComponent
      ],
      providers: [
        { provide: SharedService, useClass: SharedMockService },
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get all tasks', () => {
    expect(component).toBeTruthy();
    expect(component.filteredTasks.length).toBeGreaterThanOrEqual(0);
  });

  it('should filter based on task name', () => {    
    fixture.whenStable().then(() => {
      let taskName = fixture.debugElement.query(By.css('#Task'));
      taskName.nativeElement.value = 'Task 1';
      taskName.nativeElement.dispatchEvent(new Event('input'));
      taskName.nativeElement.dispatchEvent(new Event('blur'));            
      expect(component.filteredTasks.length).toBe(1);
    });
  });


  it('should reload when filters are cleared', () => {    
    fixture.whenStable().then(() => {
      let taskName = fixture.debugElement.query(By.css('#Task'));
      taskName.nativeElement.value = 'Task 1';
      taskName.nativeElement.dispatchEvent(new Event('input'));
      taskName.nativeElement.dispatchEvent(new Event('blur'));            
      taskName.nativeElement.value = '';
      taskName.nativeElement.dispatchEvent(new Event('input'));
      taskName.nativeElement.dispatchEvent(new Event('blur'));            
      expect(component.filteredTasks.length).toBe(2);
    });
  });


});
