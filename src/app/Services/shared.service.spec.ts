import { TestBed, inject, async } from '@angular/core/testing';
import { SharedService } from 'src/app/Services/shared.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/internal/Observable';
import { TaskDO } from 'src/app/Model/task';
import { ParentDO } from 'src/app/Model/parent';
import { UserDO } from 'src/app/Model/user';
import { ProjectDO } from 'src/app/Model/project';
import { HttpClientModule, HttpRequest, HttpParams, HttpResponse } from '@angular/common/http';


describe('SharedService', () => {

  const mockTasks = [
    { TaskId: 1, TaskTitle: 'Parent Task 1', ProjectId:1, ParentTaskId: 1, ParentTaskTitle:'Parent Task 1', Priority: 12, StartDate: null, EndDate: null, IsTaskEnded: false, UserId: 1 },
    { TaskId: 2, TaskTitle: 'Task 2', ProjectId:2, ParentTaskId: null, ParentTaskTitle:'', Priority: 1, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false, UserId: 2 }
  ];

  const mockParentTasks = [
    { ParentTaskId: 1, ParentTaskTitle: 'Parent Task 1' },
    { ParentTaskId: 2, ParentTaskTitle: 'Parent Task 2' }
  ];

  const mockUsers = [
    { UserId: 1, FirstName:'Sanju', LastName:'Samson', EmployeeId: "123456", TaskId: null },
    { UserId: 2, FirstName:'Rahul', LastName:'Dravid', EmployeeId: "234568", TaskId: null }
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
        { TaskId: 1, TaskTitle: 'Parent Task 1', ProjectId:1, ParentTaskId: 1, ParentTaskTitle:'Parent Task 1', Priority: 12, StartDate: null, EndDate: null, IsTaskEnded: false, UserId: 1 },
        { TaskId: 2, TaskTitle: 'Task 2', ProjectId:2, ParentTaskId: null, ParentTaskTitle:'', Priority: 1, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false, UserId: 2 }
      ];
      expect(actual).toEqual(expected);
    });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/task',
      method: 'GET'
    }).flush(mockTasks);

  })));
  
  it('get all parent tasks', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {
    service.getAllParentTasks().subscribe(actual => {
      var expected = [
        { ParentTaskId: 1, ParentTaskTitle: 'Parent Task 1' },
        { ParentTaskId: 2, ParentTaskTitle: 'Parent Task 2' }
      ];
      expect(actual).toEqual(expected);
    });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/parenttask',
      method: 'GET'
    }).flush(mockParentTasks);

  })));

  it('get all users', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {
    service.getAllUsers().subscribe(actual => {
      var expected = [
        { UserId: 1, FirstName:'Sanju', LastName:'Samson', EmployeeId: "123456", TaskId: null },
        { UserId: 2, FirstName:'Rahul', LastName:'Dravid', EmployeeId: "234568", TaskId: null }
      ];
      expect(actual).toEqual(expected);
    });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/user',
      method: 'GET'
    }).flush(mockUsers);
  })));

  it('get a task', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {
    var expected = [
      { TaskId: 1, TaskTitle: 'Parent Task 1', ProjectId:1, ParentTaskId: 1, ParentTaskTitle:'Parent Task 1', Priority: 12, StartDate: null, EndDate: null, IsTaskEnded: false, UserId: 1 },
        { TaskId: 2, TaskTitle: 'Task 2', ProjectId:2, ParentTaskId: null, ParentTaskTitle:'', Priority: 1, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false, UserId: 2 }
    ];
    service.getTask(1).subscribe(actual => {
      expect(actual).toEqual(expected[0]);
      expect(actual.TaskId).toBe(1);
      expect(actual.TaskTitle).toContain('Parent Task 1');
    });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/task/1',
      method: 'GET'
    }).flush(mockTasks[0]);

  })));

  it('get a parent task', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {
    var expected = [
      { ParentTaskId: 1, ParentTaskTitle: 'Parent Task 1' },
      { ParentTaskId: 2, ParentTaskTitle: 'Parent Task 2' }
    ];
    service.getParentTask(1).subscribe(actual => {
      expect(actual).toEqual(expected[0]);
      expect(actual.ParentTaskId).toBe(1);
      expect(actual.ParentTaskTitle).toContain('Parent Task');
    });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/parenttask/1',
      method: 'GET'
    }).flush(mockParentTasks[0]);

  })));

  it('get an user', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {
    var expected = [
        { UserId: 1, FirstName:'Sanju', LastName:'Samson', EmployeeId: "123456", TaskId: null },
        { UserId: 2, FirstName:'Rahul', LastName:'Dravid', EmployeeId: "234568", TaskId: null }
    ];
    service.getUser(1).subscribe(actual => {
      expect(actual).toEqual(expected[0]);
      expect(actual.UserId).toBe(1);
      expect(actual.FirstName).toContain('Sanju');
    });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/user/1',
      method: 'GET'
    }).flush(mockUsers[0]);

  })));

  it('add a task', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    let taskData: TaskDO = {
      TaskId: 1, TaskTitle: 'Parent Task 1', ProjectId:1, ParentTaskId: 1, ParentTaskTitle:'Parent Task 1', Priority: 12, StartDate: null, EndDate: null, IsTaskEnded: false, UserId: 1 
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

  it('add a parent task', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    let parentData: ParentDO = {
       ParentTaskId: 1, ParentTaskTitle: 'Parent Task 1' 
    };

    service.addParentTask(parentData).subscribe((data: any) => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('add parent task was successful');
    },
      (error: any) => { });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/parenttask',
      method: 'POST'
    })
      .flush({
        success: true,
        message: 'add parent task was successful'
      });
  })));

  it('add an user', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    let userData: UserDO = {
       UserId: 1, FirstName:"Sabchin", LastName:"Tendulkar", EmployeeId: "568974", TaskId: null
    };

    service.addUser(userData).subscribe((data: any) => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('add user was successful');
    },
      (error: any) => { });

    backEnd.expectOne({
      url: 'http://localhost:63887/api/user',
      method: 'POST'
    })
      .flush({
        success: true,
        message: 'add user was successful'
      });
  })));

  it('update an user', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    const userData: UserDO = {
      UserId: 1, FirstName:"Sabchin", LastName:"Tendulkar", EmployeeId: "568974", TaskId: null
   };

    service.updateUser(userData.UserId, userData).subscribe(data => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('update user was successful');
    },
      (error: any) => { });

    backEnd.expectOne('http://localhost:63887/api/user/1')
      .flush({
        success: true,
        message: 'update user was successful'
      });
  })));

  it('update a task', async(inject([SharedService, HttpTestingController], (service: SharedService, backEnd: HttpTestingController) => {

    const taskData: TaskDO = {
      TaskId: 8, TaskTitle: 'Parent Task 1', ProjectId:1, ParentTaskId: 1, ParentTaskTitle:'Parent Task 1', Priority: 12, StartDate: null, EndDate: null, IsTaskEnded: false, UserId: 1 
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

  it('update a parent task', async(inject([SharedService, HttpTestingController], 
    (service: SharedService, backEnd: HttpTestingController) => {

    const parentData: ParentDO = {
      ParentTaskId: 1, ParentTaskTitle: 'Parent Task 1' 
    };

    service.updateParentTask(parentData.ParentTaskId, parentData).subscribe(data => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('update parent task was successful');
    },
      (error: any) => { });

    backEnd.expectOne('http://localhost:63887/api/parenttask/1')
      .flush({
        success: true,
        message: 'update parent task was successful'
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
    requests[1].flush([{TaskId: 1, TaskTitle: 'Parent Task 1', ProjectId:1, ParentTaskId: 1, ParentTaskTitle:'Parent Task 1', Priority: 12, StartDate: null, EndDate: null, IsTaskEnded: false, UserId: 1} ]);
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
