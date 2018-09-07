import { Injectable } from '@angular/core';
import { TaskDO } from 'src/app/Model/task';
import { ParentDO } from 'src/app/Model/parent';
import { UserDO } from 'src/app/Model/user';
import { ProjectDO } from 'src/app/Model/project';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SharedMockService {

  projectDO: ProjectDO[] = [{ ProjectId: 1, CompletedTasks: 0, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), ManagerId: 1, ManagerName: "Gamage", NoofTasks: 1, Priority: 12, ProjectTitle: 'Test' }];
 
  userDO : UserDO[] = [{UserId:1,FirstName:"Rohith", LastName: "Sharma",EmployeeId:"212134", TaskId: null }];

  constructor() { }

  addTask(task: TaskDO):Observable<any> {    
    return Observable.create(data => {
      data.next(task);
      data.complete();
    });
  }

  addUser(user: UserDO): Observable<UserDO> {
    this.userDO.push(user);    
    return Observable.create(data => {
      data.next(this.userDO);
      data.complete();
    });
  }

  addParentTask(parent: ParentDO) {
    return null;
  }

  addProject(project: ProjectDO):Observable<ParentDO> {
    this.projectDO.push(project);    
    return Observable.create(data => {
      data.next(this.projectDO);
      data.complete();
    });
  }

  getTask(id: number): Observable<TaskDO> {
    const taskDO: TaskDO = { TaskId: 1, ProjectId: 2, UserId: 1, TaskTitle: 'Task 1', ParentTaskId: 2, ParentTaskTitle: null, Priority: 12, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false };
    return Observable.create(data => {
      data.next(taskDO);
      data.complete();
    });
  }

  getParentTask(id: number): Observable<ParentDO> {
    const parentDO: ParentDO = { ParentTaskId: 1, ParentTaskTitle: 'Parent Task 1' };
    return Observable.create(data => {
      data.next(parentDO);
      data.complete();
    });
  }

  getUser(id: number): Observable<UserDO> {
    const userDO: UserDO = { UserId: 1, FirstName: 'Sanju', LastName: 'Samson', EmployeeId: "123456", TaskId: null };
    return Observable.create(data => {
      data.next(userDO);
      data.complete();
    });
  }

  getProject(id: number): Observable<ProjectDO> {
    const projectDO: ProjectDO = { ProjectId: 1, CompletedTasks: 0, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), ManagerId: 1, ManagerName: "Game", NoofTasks: 1, Priority: 12, ProjectTitle: 'Test' };
    return Observable.create(data => {
      data.next(projectDO);
      data.complete();
    });
  }
  
  getTasks(): Observable<TaskDO[]> {
    const mockTasks: TaskDO[] = [
      { TaskId: 1, TaskTitle: 'Task 1', ProjectId: 2, UserId: 1, ParentTaskId: 1, ParentTaskTitle: null, Priority: 12, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false },
      { TaskId: 2, TaskTitle: 'Task 2', ProjectId: 2, UserId: 1, ParentTaskId: 2, ParentTaskTitle: null, Priority: 1, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false }
    ];
    return Observable.create(data => {
      data.next(mockTasks);
      data.complete();
    });
  }

  getAllParentTasks(): Observable<ParentDO[]> {
    const mockParentTasks: ParentDO[] = [
      { ParentTaskId: 1, ParentTaskTitle: 'Parent Task 1' },
      { ParentTaskId: 2, ParentTaskTitle: 'Parent Task 2' }
    ];
    return Observable.create(data => {
      data.next(mockParentTasks);
      data.complete();
    });
  }

  getAllUsers(): Observable<UserDO[]> {    
    return Observable.create(data => {
      data.next(this.userDO);
      data.complete();
    });
  }

  getAllProjects(): Observable<ProjectDO[]> {    
    return Observable.create(data => {
      data.next(this.projectDO);
      data.complete();
    });
  }

  getTasksByProjectId(projectId : number) : Observable<ProjectDO[]> {    
    return Observable.create(data => {
      data.next(this.projectDO);
      data.complete();
    });
  }

  updateTask(id: number, task: TaskDO) {
    return null;
  }

  updateParentTask(id: number, parent: ParentDO) {
    return null;
  }

  updateUser(id: number, user: UserDO): Observable<UserDO[]> {    
    return Observable.create(data => {
      data.next(this.userDO);
      data.complete();
    });
  }

  updateProject(id: number, project: ProjectDO) {
    return null;
  }
}
