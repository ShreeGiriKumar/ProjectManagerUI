import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TaskDO } from 'src/app/Model/task';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { error } from 'selenium-webdriver';
import { ProjectDO } from 'src/app/Model/project';
import { UserDO } from 'src/app/Model/user';
import { DatePipe } from '@angular/common';
import { ParentDO } from 'src/app/Model/parent';


@NgModule({
  imports: [
    FormsModule
  ]
})

@Component({
  selector: 'app-add',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
  providers: [DatePipe]
})


export class AddComponent implements OnInit {

  unfilteredProjects$: Observable<ProjectDO[]>;
  filteredProjects: ProjectDO[];
  unfilteredUsers$: Observable<UserDO[]>;
  filteredUsers: UserDO[];
  taskName: string;
  parentTask: string;
  priority: number = 0;
  startDate: string;
  endDate: string;
  taskData: TaskDO;
  sliderVal: number;
  projectTitle: string;
  filterProjectText: string = null;
  filterUserText: string = null;
  userId: number;
  projectId: number;
  user: string = null;
  errValidationMsg: string;
  parentTaskChk: boolean = false;
  parentChk: boolean = false;
  parentTasksList$: Observable<ParentDO[]> = null;
  parentTasks: ParentDO[] = null;  
  selectedElement: any = { ParentTaskId: -1, ParentTaskTitle: '--Select Parent Task--' };
  parentTaskIdObs: Observable<any>;
  parentTaskId: number;

  constructor(private sharedService: SharedService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllProjects();
    this.setDate();
    this.getParentTasks();
  }


  /**Function to Add Task */
  addTask() {
    if (!this.validateInput()) {
      return false;
    }
    else {
      if (this.parentTaskChk) {
        let parentTaskData: ParentDO =
          {
            ParentTaskId: 0,
            ParentTaskTitle: this.taskName
          };
        this.parentTaskIdObs = this.sharedService.addParentTask(parentTaskData);
        this.parentTaskIdObs.subscribe(data => {

          let taskData: TaskDO = {
            TaskId: 0,
            TaskTitle: this.taskName,
            ParentTaskId: data,
            ProjectId: this.projectId,
            Priority: this.priority,
            StartDate: null,
            EndDate: null,
            IsTaskEnded: false,
            ParentTaskTitle: null,
            UserId: null, 
          };
          this.sharedService.addTask(taskData).subscribe(() => {
            this.resetFields();
            this.getParentTasks();            
          });
        });
      }
      else {

        let taskData: TaskDO = {
          TaskId: 0,
          TaskTitle: this.taskName,
          ParentTaskId: this.selectedElement.ParentTaskId,
          ProjectId: this.projectId,
          Priority: this.priority,
          StartDate: new Date(this.startDate),
          EndDate: new Date(this.endDate),
          IsTaskEnded: false,
          ParentTaskTitle: null,
          UserId: this.userId
        };
        this.sharedService.addTask(taskData).subscribe(() => {
          this.resetFields();
          this.getAllUsers();
        });
      }
    }
  }

  /**Function to validate input */
  validateInput() {
    if (new Date(this.startDate) > new Date(this.endDate)) {
      this.errValidationMsg = "Project Start Date cannot be later than End Date";
      return false;
    }
    if ((this.user == null || this.user == '') && !this.parentTaskChk) {
      this.errValidationMsg = "Please select an User";
      return false;
    }
    if (this.projectTitle == null || this.projectTitle == '') {
      this.errValidationMsg = "Please select a Project";
      return false;
    }
    return true;
  }

  /** Function to Set Date */
  setDate() {
    this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.endDate = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
  }

  /**Function to get all projects */
  getAllProjects() {
    this.unfilteredProjects$ = this.sharedService.getAllProjects();
    this.unfilteredProjects$.subscribe(data => {
      this.filteredProjects = data;
    });
  }

  /**Function to get all users */
  getAllUsers() {
    this.unfilteredUsers$ = this.sharedService.getAllUsers();
    this.unfilteredUsers$.subscribe(data => {
      this.filteredUsers = data.filter( usr => usr.TaskId == 0);
    });
  }

  /** */
  getParentTasks() {
    this.parentTasksList$ = this.sharedService.getAllParentTasks();
    this.parentTasksList$.subscribe(data => {
      this.parentTasks = data;
    });
  }

  /** Function to get the selected user from modal */
  selectedUser(userId: number, firstName: string, lastName: string) {
    this.user = firstName + " " + lastName;
    this.userId = userId;
  }

  /** Function to get the selected user from modal */
  selectedProject(projectId: number, projectTitle: string) {
    this.projectTitle = projectTitle;
    this.projectId = projectId;
  }
 
  /**To display priority chosen */
  show_value(val: number) {
    this.sliderVal = this.priority;
  }

  /** Functiont to filter the projects*/
  filterProjects() {
    this.filteredProjects = this.filteredProjects.filter(data => data.ProjectTitle != null && data.ProjectTitle.startsWith(this.filterProjectText));
    if (this.filterProjectText == null || this.filterProjectText == '')
      this.unfilteredProjects$.subscribe(data => { this.filteredProjects = data; });
  }

  /**Function to filter user */
  filterUsers() {
    var filterFName = this.filteredUsers.filter(data => data.FirstName != null && data.FirstName
      .startsWith(this.filterUserText));

    var filterLName = this.filteredUsers.filter(data => data.LastName != null
      && data.LastName.startsWith(this.filterUserText));

    var filterEmpId = this.filteredUsers.filter(data => data.EmployeeId != null && data.EmployeeId
      .startsWith(this.filterUserText));

    this.filteredUsers = filterFName.concat(filterLName).concat(filterEmpId).filter(this.onlyUnique);

    if (this.filterUserText == null)
      this.unfilteredUsers$.subscribe(data => { this.filteredUsers = data; });
  }

  /** To set date based on check box selection */
  checkValue(event: any) {
    if (event.currentTarget.checked) {
      this.parentTaskChk = this.parentChk = true;
      this.startDate = null;
      this.endDate = null;
      this.user = null;
      this.parentTask = null;
      this.priority = 0;
      this.sliderVal = null;
      this.selectedElement = { ParentTaskId: -1, ParentTaskTitle: '--Select Parent Task--' };
    }
    else {
      this.parentTaskChk = this.parentChk = false;
    }
  }

  /**Function to Reset UI Fields */
  resetFields() {
    this.projectTitle = "";
    this.errValidationMsg = "";
    this.priority = 0;
    this.sliderVal = null;
    this.user = null;
    this.taskName = null;
    this.parentTask = null;
    this.setDate();
    this.parentTaskChk = this.parentChk = false;
    this.selectedElement = { ParentTaskId: -1, ParentTaskTitle: '--Select Parent Task--' };
  }

  /** Function to return Unique results */
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
