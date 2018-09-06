import { Injectable } from '@angular/core';
import { TaskDO } from 'src/app/Model/task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { UserDO } from 'src/app/Model/user';
import { ProjectDO } from 'src/app/Model/project';
import { ParentDO } from 'src/app/Model/parent';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' })
};


@Injectable({
  providedIn: 'root'
})


export class SharedService {

  tasksUrl: string = "http://localhost:63887/api/task";
  tasksByProjUrl: string = "http://localhost:63887/api/task/GetAllTaskByProj";
  userUrl: string = "http://localhost:63887/api/user";
  projectUrl: string = "http://localhost:63887/api/project";
  parentTaskUrl: string = "http://localhost:63887/api/parenttask";

  /** Generic Error Handler */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead 
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {
  }

  /** Service to Add a Task */
  addTask(task: TaskDO) {
    return this.http.post<TaskDO>(this.tasksUrl, JSON.stringify(task), httpOptions).pipe(
      tap(tasks => console.log('Task Added')),
      catchError(this.handleError<TaskDO>('Add a new Task'))
    );
  }

  /** Service to Get Task By Id */
  getTask(id: number): Observable<TaskDO> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<TaskDO>(url).pipe(
      catchError(this.handleError<TaskDO>(`Get Task id=${id}`))
    );
  }

  /** Service to Gat All Tasks */
  getTasks(): Observable<TaskDO[]> {
    return this.http.get<TaskDO[]>(this.tasksUrl).pipe(
      catchError(this.handleError('Get All Tasks', []))
    );
  }

  /** Service to Gat All Tasks by Project Id*/
  getTasksByProjectId(projectId: number): Observable<TaskDO[]> {
    const url = `${this.tasksByProjUrl}/${projectId}`;
    return this.http.get<TaskDO[]>(url).pipe(
      catchError(this.handleError('Get All Tasks By Proj Id', []))
    );
  }

  /** Service to Update Task */
  updateTask(id: number, task: TaskDO): Observable<any> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.put(url, JSON.stringify(task), httpOptions).pipe(
      catchError(this.handleError<any>('Update Task'))
    );
  }

  /** Service to End Task */
  endTask(id: number) {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.put(url, id, httpOptions).pipe(
      catchError(this.handleError<any>('Mark Task Ended'))
    );
  }

  /** Service to Add a Parent Task */
  addParentTask(parentTask: ParentDO): Observable<any> {
    return this.http.post<ParentDO>(this.parentTaskUrl, JSON.stringify(parentTask), httpOptions).pipe(
      tap(tasks => console.log('Parent Task Added')),
      catchError(this.handleError<ParentDO>('Add a new Parent Task'))
    );
  }

  /** Service to Get Parent Task By Id */
  getParentTask(id: number): Observable<ParentDO> {
    const url = `${this.parentTaskUrl}/${id}`;
    return this.http.get<ParentDO>(url).pipe(
      catchError(this.handleError<ParentDO>(`Get Parent Task id=${id}`))
    );
  }

  /** Service to get All Parent Tasks */
  getAllParentTasks(): Observable<ParentDO[]> {
    return this.http.get<ParentDO[]>(this.parentTaskUrl).pipe(
      catchError(this.handleError('Get All Parent Projects', []))
    );
  }

  /** Service to Update Parent Task */
  updateParentTask(id: number, parentTask: ParentDO): Observable<any> {
    const url = `${this.parentTaskUrl}/${id}`;
    return this.http.put(url, JSON.stringify(parentTask), httpOptions).pipe(
      catchError(this.handleError<any>('Update Parent Task'))
    );
  }

  /** Service to Add an User */
  addUser(user: UserDO) {
    return this.http.post<UserDO>(this.userUrl, JSON.stringify(user), httpOptions).pipe(
      tap(users => console.log('User Added')),
      catchError(this.handleError<TaskDO>('Add a new User'))
    );
  }

  /** Service to Get All Users */
  getAllUsers(): Observable<UserDO[]> {
    return this.http.get<UserDO[]>(this.userUrl).pipe(
      catchError(this.handleError('Get All Users', []))
    );
  }

  /** Service to Get User By Id */
  getUser(id: number): Observable<UserDO> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<UserDO>(url).pipe(
      catchError(this.handleError<UserDO>(`Get User id=${id}`))
    );
  }

  /** Service to Update User */
  updateUser(id: number, user: UserDO): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.put(url, JSON.stringify(user), httpOptions).pipe(
      catchError(this.handleError<any>('Update User'))
    );
  }

  /** Service to Delete User */
  deleteUser(id: number): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>('Delete User'))
    );
  }

  /** Service to Add Project */
  addProject(project: ProjectDO) {
    return this.http.post<UserDO>(this.projectUrl, JSON.stringify(project), httpOptions).pipe(
      tap(projects => console.log('Project Added')),
      catchError(this.handleError<TaskDO>('Add a new Project'))
    );
  }

  /** Service to Get All Projects */
  getAllProjects(): Observable<ProjectDO[]> {
    return this.http.get<ProjectDO[]>(this.projectUrl).pipe(
      catchError(this.handleError('Get All Projects', []))
    );
  }

  /** Service to Get Project By Id */
  getProject(id: number): Observable<ProjectDO> {
    const url = `${this.projectUrl}/${id}`;
    return this.http.get<ProjectDO>(url).pipe(
      catchError(this.handleError<ProjectDO>(`Get Project id=${id}`))
    );
  }

  /** Service to Update Project */
  updateProject(id: number, project: ProjectDO): Observable<any> {
    const url = `${this.projectUrl}/${id}`;
    return this.http.put(url, JSON.stringify(project), httpOptions).pipe(
      catchError(this.handleError<any>('Update Project'))
    );
  }

}
