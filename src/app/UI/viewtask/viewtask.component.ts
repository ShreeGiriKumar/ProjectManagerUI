import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TaskDO } from 'src/app/Model/task';
import { ProjectDO } from 'src/app/Model/project';
import { SharedService } from 'src/app/Services/shared.service';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { formatDate } from '@angular/common';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css'],
  providers: [DatePipe]
})
export class ViewComponent implements OnInit {
  unfilteredProjects$: Observable<ProjectDO[]>;
  filteredProjects: ProjectDO[];
  originalTasks$: Observable<TaskDO[]>;
  filteredTasks: TaskDO[];
  filterTask: string = null;
  filterParentTask: string = null;
  filterPriorityFrom: string = null;
  filterPriorityTo: string = null;
  filterStartDate: string = null;
  filterEndDate: string = null;
  taskToEnd : TaskDO;
  filterProjectText : string = null;
  projectTitle = null;
  projectId: number;
  path: string[] = ['StartDate'];
  order: number = 1;
  errMsgToShow: boolean = false;


  constructor(private sharedService: SharedService, private datePipe: DatePipe) {
  }

  ngOnInit() {    
    this.getAllProjects();
  }


  /** Function to get all projects */
  getAllProjects(){
    this.unfilteredProjects$ = this.sharedService.getAllProjects();
    this.unfilteredProjects$.subscribe(data => {
      this.filteredProjects = data;
    });
  }

  /* Function to end the Task */
  endTask(taskId: number) {
    this.taskToEnd = this.filteredTasks.find(x=>x.TaskId == taskId);
    this.taskToEnd.IsTaskEnded = true;
    this.sharedService.updateTask(taskId, this.taskToEnd).subscribe(()=>{
      this.getTasks(this.projectId);  
    });  
  }

  /** Function to get all Tasks in a Project*/
  getTasks(projectId: number) {
    this.originalTasks$ = this.sharedService.getTasksByProjectId(projectId);
    this.originalTasks$.subscribe(data => {
      this.filteredTasks = data
      if(data == null || data.length <= 0)
      this.errMsgToShow = true;
    });
  }

  /** Functiont to filter the projects*/
  filterProjects() {
    this.filteredProjects = this.filteredProjects.filter(data => data.ProjectTitle != null && data.ProjectTitle.startsWith(this.filterProjectText));
    if(this.filterProjectText == null || this.filterProjectText == '')
    this.unfilteredProjects$.subscribe(data => {
      this.filteredProjects = data;
    });
  }

  /** Function to get the selected user from modal */
  selectedProject(projectId:number, projectTitle:string){
    this.projectTitle = projectTitle;
    this.projectId = projectId;    
    this.errMsgToShow = false;
    this.getTasks(this.projectId);        
  }

  /**Sort the projectr by Start, End Date, Priority & Completed */
  sortProjects(sortBy: string) {
    this.path = sortBy.split('.');
    this.order = this.order * (-1);
    return false;
  }
}
