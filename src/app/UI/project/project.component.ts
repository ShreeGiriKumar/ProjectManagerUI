import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { DatePipe } from '@angular/common';
import { ProjectDO } from 'src/app/Model/project';
import { UserDO } from 'src/app/Model/user';
import { formatDate } from '@angular/common';
import { map, filter, scan } from 'rxjs/operators';

@NgModule({
  imports: [
    FormsModule
  ]
})

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [DatePipe]
})

export class ProjectComponent implements OnInit {
  unfilteredProjects$: Observable<ProjectDO[]>;
  filteredProjects: ProjectDO[];
  unfilteredUsers$: Observable<UserDO[]>;
  filteredUsers: UserDO[];
  btnText: string = "Add Project";
  priority: number = 0;
  startDate: string;
  endDate: string;
  sliderVal: number;
  projectTitle: string;
  managerName: string;
  dateDisabled: boolean = true;
  errValidationMsg: string;
  path: string[] = ['StartDate'];
  order: number = 1;
  filterText: string = null;
  filterUserText: string = null;
  userId: number;
  hdnManagerUserIdDB: number;
  hdnProjectId: number;
  managerModified: boolean = false;

  constructor(private sharedService: SharedService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllProjects();
    this.getAllUsers();
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
      this.filteredUsers = data;
    });
  }

  /** Function to get the selected user from modal */
  selectedUser(userId: number, firstName: string, lastName: string) {
    this.managerName = firstName + " " + lastName;
    this.userId = userId;
    this.managerModified = true;
  }

  /** Function to add/update project */
  addUpdtProject() {
    if (!this.validateInput()) {
      return false;
    }
    else {
      if (this.btnText == "Add Project") {
        let projectToAdd: ProjectDO = {
          ProjectId: 0,
          ProjectTitle: this.projectTitle,
          Priority: this.priority,
          StartDate: this.startDate != null ? new Date(this.startDate) : null,
          EndDate: this.endDate != null ? new Date(this.endDate) : null,
          ManagerId: this.userId,
          NoofTasks: 0,
          CompletedTasks: 0,
          ManagerName: this.managerName
        };
        this.sharedService.addProject(projectToAdd).subscribe(() => {
          this.getAllProjects();
          this.resetFields();
        });
      }
      else if (this.btnText == "Update Project") {
        let projectToUpd: ProjectDO = {
          ProjectId: this.hdnProjectId,
          ProjectTitle: this.projectTitle,
          Priority: this.priority,
          StartDate: this.startDate != null ? new Date(this.startDate) : null,
          EndDate: this.endDate != null ? new Date(this.endDate) : null,
          ManagerId: this.managerModified ? this.userId : this.hdnManagerUserIdDB,
          NoofTasks: 0,
          CompletedTasks: 0,
          ManagerName: this.managerName
        };
        this.sharedService.updateProject(this.hdnProjectId, projectToUpd).subscribe(() => {
          this.getAllProjects();          
          this.resetFields();          
          this.btnText = "Add Project";
        });        
      }
    }
  }

  /** Function to fetch the project and populate UI*/
  editProject(projectId: number) {
    this.btnText = "Update Project";
    this.errValidationMsg = null;
    this.sharedService.getProject(projectId).subscribe(data => {
      this.projectTitle = data.ProjectTitle;
      this.priority = data.Priority;
      this.startDate = data.StartDate != null ? this.datePipe.transform(data.StartDate, 'yyyy-MM-dd') : null;
      this.endDate = data.EndDate != null ? this.datePipe.transform(data.EndDate, 'yyyy-MM-dd') : null;
      this.managerName = data.ManagerName;
      this.hdnManagerUserIdDB = data.ManagerId;
      this.hdnProjectId = data.ProjectId;
      this.managerModified = false;
    });
  }

  /**Function to validate input */
  validateInput() {    
    if ((this.startDate == null || this.endDate == null) && !this.dateDisabled) {
      this.errValidationMsg = "Please enter Project Dates";      
      return false;
    }
    else if (new Date(this.startDate) > new Date(this.endDate)) {
      this.errValidationMsg = "Project Start Date cannot be later than End Date";
      return false;
    }
    if (this.managerName == null || this.managerName == '') {
      this.errValidationMsg = "Please select a Manager";
      return false;
    }
    return true;
  }

  /** To set date based on check box selection */
  checkValue(event: any) {
    if (event.currentTarget.checked) {
      this.setDate();
      this.dateDisabled = false;
    }
    else {
      this.startDate = this.endDate = null;
      this.dateDisabled = true;
    }
  }

  /** Function to Set Date */
  setDate() {
    this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.endDate = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
  }

  /**To display priority chosen */
  show_value(val: number) {
    this.sliderVal = this.priority;
  }

  /**Sort the projectr by Start, End Date, Priority & Completed */
  sortProjects(sortBy: string) {
    this.path = sortBy.split('.');
    this.order = this.order * (-1);
    return false;
  }

  /** Functiont to filter the projects*/
  filterProjects() {
    this.filteredProjects = this.filteredProjects.filter(data => data.ProjectTitle != null && data.ProjectTitle.startsWith(this.filterText));
    if(this.filterText == null || this.filterText == '')
    this.unfilteredProjects$.subscribe(data => {
      this.filteredProjects = data;
    });
  }

  /**Function to Reset UI Fields */
  resetFields() {
    this.projectTitle = "";
    this.errValidationMsg = "";
    this.priority = 0;
    this.sliderVal = null;
    this.managerName = "";
    this.startDate = null;
    this.endDate = null;
    if (!this.dateDisabled) {
      this.setDate();
    }
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

    if (this.filterUserText == null || this.filterUserText == '')
      this.unfilteredUsers$.subscribe(data => { this.filteredUsers = data; });
  }

  /** Function to return Unique results */
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
