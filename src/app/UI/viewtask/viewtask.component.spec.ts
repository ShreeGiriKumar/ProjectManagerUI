import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponent } from './viewtask.component';
import { SharedService } from 'src/app/Services/shared.service';
import { SharedMockService } from 'src/test/shared-mock.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SortingPipe } from 'src/app/Pipe/sorting.pipe';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewComponent,
        SortingPipe
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

  it('should get all projects', () => {
    expect(component).toBeTruthy();
    expect(component.filteredProjects.length).toBeGreaterThanOrEqual(1);
  });

  it('should get all tasks in a project', () => {
    expect(component).toBeTruthy();    
    let projTitle = fixture.debugElement.query(By.css('#projectTitle'));
    component.getTasks(1);
    expect(component.filteredTasks.length).toBeGreaterThanOrEqual(1);
  });
});
