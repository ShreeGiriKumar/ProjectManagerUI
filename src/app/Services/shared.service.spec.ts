import { TestBed, inject, async } from '@angular/core/testing';
import { SharedService } from 'src/app/Services/shared.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/internal/Observable';
import { TaskDO } from 'src/app/Model/task';
import { HttpClientModule, HttpRequest, HttpParams, HttpResponse } from '@angular/common/http';


describe('SharedService', () => {


  const mockTasks = [
    { TaskId: 1, TaskInfo: 'Task 1', ParentTask: 'Parent Task', Priority: 12, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false },
    { TaskId: 2, TaskInfo: 'Task 2', ParentTask: '', Priority: 1, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SharedService
      ]
    });
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));

  it('get all tasks', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {
    service.getTasks().subscribe(actual => {
      var expected = [
        { TaskId: 1, TaskInfo: 'Task 1', ParentTask: 'Parent Task', Priority: 12, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false },
        { TaskId: 2, TaskInfo: 'Task 2', ParentTask: '', Priority: 1, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false }
      ];
      expect(actual).toEqual(expected);
    });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/task',
      method: 'GET'
    }).flush(mockTasks);

  })));


  it('get a task', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {
    var expected = [
      { TaskId: 1, TaskInfo: 'Task 1', ParentTask: 'Parent Task', Priority: 12, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false },
      { TaskId: 2, TaskInfo: 'Task 2', ParentTask: '', Priority: 1, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false }
    ];
    service.getTask(1).subscribe(actual => {
      expect(actual).toEqual(expected[0]);
      expect(actual.TaskId).toBe(1);
      expect(actual.ParentTask).toContain('Parent Task');
    });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/task/1',
      method: 'GET'
    }).flush(mockTasks[0]);

  })));


  it('add a task', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    let taskData: TaskDO = {
      TaskId: 8,
      TaskInfo: 'Sample Task',
      ParentTask: 'Parent Task',
      Priority: 8,
      StartDate: new Date(),
      EndDate: new Date(),
      IsTaskEnded: false
    };

    service.addTask(taskData).subscribe((data: any) => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('add task was successful');
    },
      (error: any) => { });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/task',
      method: 'POST'
    })
      .flush({
        success: true,
        message: 'add task was successful'
      });

  })));

  it('update a task', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    const taskData: TaskDO = {
      TaskId: 8,
      TaskInfo: 'Sample Task',
      ParentTask: 'Parent Task',
      Priority: 8,
      StartDate: new Date('2017-11-12'),
      EndDate: new Date('2017-12-01'),
      IsTaskEnded: false
    };

    service.updateTask(taskData.TaskId, taskData).subscribe(data => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('update task was successful');
    },
      (error: any) => { });

    backEnd.expectOne('http://localhost:63887/api/task/8')
      .flush({
        success: true,
        message: 'update task was successful'
      });

  })));

  it('end a task', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    service.endTask(1).subscribe(data => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('end task was successful');
    },
      (error: any) => { });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/task/1',
      method: 'PUT'
    })
      .flush({
        success: true,
        message: 'end task was successful'
      });

  })));

  it('should be OK returning no tasks', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    service.getTasks().subscribe(
      tasks => expect(tasks.length).toEqual(0, 'should have empty tasks array'),
      fail
    );

    backEnd.expectOne(service.tasksUrl)
      .flush([]); // Respond with no tasks
  })));

  it('should return expected tasks (called multiple times)', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    service.getTasks().subscribe();
    service.getTasks().subscribe();
    service.getTasks().subscribe(
      heroes => expect(heroes).toEqual(mockTasks, 'should return expected tasks'),
      fail
    );

    const requests = backEnd.match(service.tasksUrl);
    expect(requests.length).toEqual(3, 'calls to getTasks()');

    // Respond to each request with different mock hero results
    requests[0].flush([]);
    requests[1].flush([{ TaskId: 1, TaskInfo: 'Task 1', ParentTask: 'Parent Task', Priority: 12, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false }]);
    requests[2].flush(mockTasks);

  })));

  // it('should turn 404 error into return of the update hero', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {
  //   const updateTask: TaskDO = {
  //     TaskId: 2, TaskInfo: 'Go to airport', ParentTask: 'Get Passport', Priority: 1,
  //     StartDate: new Date('2018-08-13'), EndDate: new Date('2018-08-13'), IsTaskEnded: true
  //   };

  //   service.updateTask(updateTask.TaskId, updateTask).subscribe(
  //     data => expect(data).toEqual(updateTask, 'should return the update task'),
  //     fail
  //   );

  //   const req = backEnd.expectOne('http://localhost:63887/api/task/2');
  //   const msg = 'deliberate 404 error';
  //   req.flush(msg, { status: 404, statusText: 'Not Found' });

  // })));

});
