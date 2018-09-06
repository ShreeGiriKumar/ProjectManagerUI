export class TaskDO {
    TaskId: number;
    TaskTitle: string;
    ProjectId: number;
    ParentTaskId:number;
    ParentTaskTitle:string;
    Priority: number;
    StartDate:Date;
    EndDate: Date;
    IsTaskEnded: boolean;
    UserId:number;
}
