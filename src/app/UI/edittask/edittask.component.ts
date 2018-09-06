import { Component, OnInit } from '@angular/core';
import { TaskDO } from 'src/app/Model/task';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/Services/shared.service';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { ParentDO } from 'src/app/Model/parent';

@NgModule({
  imports: [
    FormsModule
  ]
})

@Component({
  selector: 'app-edit',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css'],
  providers: [DatePipe]
})
export class EditComponent implements OnInit {

  parentTasksList$: Observable<ParentDO[]> = null;
  parentTasks: ParentDO[] = null;  
  taskName: string;
  parentTask: string;
  priority: number = 0;
  startDate: string;
  endDate: string;
  taskData: TaskDO;
  taskId: number;
  sliderVal: number;
  selectedElement: any = { ParentTaskId: -1, ParentTaskTitle: '--Select Parent Task--' };
  parentChk: boolean;
  parentTaskChk: boolean;
  user: string;
  projectTitle: string;
  projectId: number;
  userId: number;
  errValidationMsg:string;
  parentTaskId:number;

  constructor(private route: ActivatedRoute, private sharedService: SharedService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.getTask();
    this.getParentTasks();
  }

  /**Function to Update Task */
  updateTask() {

    if(!this.validateInput()){
      return false;
    }
    else{
    if(this.parentChk){
      let parentTaskData: ParentDO =
      {
        ParentTaskId: this.parentTaskId,
        ParentTaskTitle: this.taskName
      };
      this.sharedService.updateParentTask(this.parentTaskId, parentTaskData).subscribe(data => {
        let taskData: TaskDO = {
          TaskId: this.taskId,
          TaskTitle: this.taskName,
          ParentTaskId: this.parentTaskId,
          Priority: this.priority,
          StartDate: null,
          EndDate: null,
          IsTaskEnded: false,
          ParentTaskTitle: null,
          ProjectId: this.projectId,
          UserId: null
        };
        this.sharedService.updateTask(taskData.TaskId, taskData).subscribe(() => { });
      });      
    }
    else{
      let taskData: TaskDO = {
        TaskId: this.taskId,
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
      this.sharedService.updateTask(taskData.TaskId, taskData).subscribe(() => {        
      });
    }
  }
}

  /**Function to validate input */
  validateInput() {
    if (!this.parentTaskChk && (new Date(this.startDate) > new Date(this.endDate))) {
      this.errValidationMsg = "Project Start Date cannot be later than End Date";
      return false;
    }        
    return true;
  }

  /**Function to Get Task */
  getTask() {

    var taskId = this.route.snapshot.paramMap.get('id');
    var parentTaskInd = this.route.snapshot.paramMap.get('parentInd');

    if (parentTaskInd == "1") {
      this.parentChk = this.parentTaskChk = true;
      this.user = '';
    }
    else {
      this.parentChk = this.parentTaskChk = false;
    }

    this.sharedService.getTask(parseFloat(this.route.snapshot.paramMap.get('id'))).subscribe(data => {
      this.taskId = data.TaskId;
      this.taskName = data.TaskTitle;
      this.parentTaskId = data.ParentTaskId;
      if (parentTaskInd != "1") {
        if(data.ParentTaskId != 0)
        this.selectedElement.ParentTaskId = data.ParentTaskId;
        else{
          this.selectedElement = { ParentTaskId: -1, ParentTaskTitle: '--Select Parent Task--' };
        }
      }
      this.priority = data.Priority;
      this.startDate = this.datePipe.transform(data.StartDate, 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(data.EndDate, 'yyyy-MM-dd');
      this.userId = data.UserId;
      this.projectId = data.ProjectId;

      this.sharedService.getProject(this.projectId).subscribe(data => {
        this.projectTitle = data.ProjectTitle;
        this.projectId = data.ProjectId;
      });

      if (parentTaskInd != "1") {
        this.sharedService.getUser(this.userId).subscribe(data => {
          if (data != null) {
            this.user = data.FirstName + " " + data.LastName;
            this.userId = data.UserId;
          }
        });
      }
    });
  }

  /** Function to get all Parent Task list*/
  getParentTasks() {
    this.parentTasksList$ = this.sharedService.getAllParentTasks();
    this.parentTasksList$.subscribe(data => {
      this.parentTasks = data;
    });
  }

  /**Function to Reset UI Fields */
  resetFields() {
    this.taskName = "";    
    this.priority = 0;
    this.sliderVal = null;
    this.startDate = null;
    this.endDate = null;
    this.errValidationMsg = null;
    this.selectedElement = { ParentTaskId: -1, ParentTaskTitle: '--Select Parent Task--' };
  }


  /**To display priority chosen */
  show_value(val: number) {
    this.sliderVal = this.priority;
  }
}
