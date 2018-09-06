import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserDO } from 'src/app/Model/user';
import { SharedService } from 'src/app/Services/shared.service';
import { NgModule } from '@angular/core';
import { map, filter, scan } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  unfilteredUsers$: Observable<UserDO[]>;
  filteredUsers: UserDO[];
  btnText: string = "Add User";
  firstName: string;
  lastName: string;
  employeeID: string;
  path: string[] = ['FirstName'];
  order: number = 1;
  filterText: string;
  hdnUserId: number;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  /**Function to get all users on page load */
  getAllUsers() {
    this.unfilteredUsers$ = this.sharedService.getAllUsers();
    this.unfilteredUsers$.subscribe(data => {
      this.filteredUsers = data
    });
  }

  /**Function commonly used for adding and updating an user */
  addUpdtUser() {
    if (this.btnText == "Add User") {
      let userToAdd: UserDO = {
        UserId: 0,
        FirstName: this.firstName,
        LastName: this.lastName,
        EmployeeId: this.employeeID,
        TaskId: 0
      };
      this.sharedService.addUser(userToAdd).subscribe(() => {
        this.getAllUsers();
        this.resetFields();
      });
    }
    else if (this.btnText == "Update User") {
      let userToUpd: UserDO = {
        UserId: this.hdnUserId,
        FirstName: this.firstName,
        LastName: this.lastName,
        EmployeeId: this.employeeID,
        TaskId: 0
      };
      this.sharedService.updateUser(this.hdnUserId, userToUpd).subscribe(() => {
        this.getAllUsers();
        this.hdnUserId = this.firstName = this.lastName = this.employeeID = null;
        this.btnText = "Add User";
        this.resetFields();
      });
    }
  }

  /**Function to edit user */
  editUser(userId: number) {
    this.btnText = "Update User";
    this.sharedService.getUser(userId).subscribe(data => {
      this.firstName = data.FirstName,
        this.lastName = data.LastName,
        this.employeeID = data.EmployeeId
      this.hdnUserId = data.UserId
    });
  }

  /**Function to delete user */
  deleteUser(userId: number) {
    this.sharedService.deleteUser(userId).subscribe(data => {
      this.getAllUsers();
    });    
  }

  /**Sort the user by First, Last Name & Employee Id */
  sortUsers(sortBy: string) {
    this.path = sortBy.split('.');
    this.order = this.order * (-1);
    return false;
  }

  /**Function to Reset UI Fields */
  resetFields() {
    this.firstName = "";
    this.lastName = "";
    this.employeeID = "";
  }

  /** Function to filter user */
  filterUsers() {
    var filterFName = this.filteredUsers.filter(data => data.FirstName != null && data.FirstName.startsWith(this.filterText));

    var filterLName = this.filteredUsers.filter(data => data.LastName != null && data.LastName.startsWith(this.filterText));

    var filterEmpId = this.filteredUsers.filter(data => data.EmployeeId != null && data.EmployeeId.startsWith(this.filterText));

    this.filteredUsers = filterFName.concat(filterLName).concat(filterEmpId).filter(this.onlyUnique);

    if(this.filterText == null || this.filterText == '')
    this.unfilteredUsers$.subscribe(data => { this.filteredUsers = data; });
  }

  /** Function to return Unique results */
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
