import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('/');
  }

  navigateToAddProj() {
    return browser.get('/Project');
  }

  navigateToAddUser() {
    return browser.get('/User');
  }

  navigateToAddTask() {
    return browser.get('/AddTask');
  }

  navigateToViewTask() {
    return browser.get('/ViewTask');
  }

  fillAddProjectForm() {
    element(by.id('Project')).sendKeys("Automated Project Creation").then(function () { });
    element(by.css("input[type=checkbox]")).click();
    var priority = element(by.id('TaskPriority'));
    browser.actions().dragAndDrop(priority, { x: 50, y: 0 }).perform();
    element(by.id('btnUsrModal')).click().then(() => {
      browser.sleep(1000);
      element(by.id('btnUsr')).click().then(() => {
        browser.sleep(2000);
      });
    });
  }

  submitProjectForm() {
    element(by.id('btnAddProject')).click().then(() => {
      browser.sleep(2000);
    });
  }

  fillAddUserForm() {
    element(by.id('FirstName')).sendKeys("Automated User - First Name").then(function () { });
    element(by.id('LastName')).sendKeys("Automated User - Last Name").then(function () { });
    element(by.id('EmployeeID')).sendKeys("Automated User - Employee ID").then(function () { });
    element(by.id('btnAddUser')).click().then(() => {
      browser.sleep(1000);
    });
  }


  fillAddTaskForm() {
    element(by.id('btnProjectSearch')).click().then(() => {
      browser.sleep(1000);
      element(by.id('btnProjSelect')).click().then(() => {
        browser.sleep(1000);
      });
    });
    element(by.id('TaskName')).sendKeys("Automated Task").then(function () { });

    var priority = element(by.id('TaskPriority'));
    browser.actions().dragAndDrop(priority, { x: 50, y: 0 }).perform();

    element(by.cssContainingText('option', 'Prepare for Tournament')).click();

    element(by.id('StartDate')).sendKeys("12-12-2018").then(function () { });
    element(by.id('EndDate')).sendKeys("12-12-2018").then(function () { });

    element(by.id('btnUserSearch')).click().then(() => {
      browser.sleep(1000);
      element(by.id('btnUsr')).click().then(() => {
        browser.sleep(1000);
      });
    });
  }

  submitAddTask() {
    element(by.id('btnAddTask')).click().then(() => {
      browser.sleep(2000);
    });
  }

  getMenuFirstEleText() {
    return element(by.css('app-menu a')).getText();
  }

  getViewTaskTable() {
    return element(by.css('table'));
  }

  getFirstRow() {
    return element(by.css('.table')).all(by.tagName('tr')).get(0);
  }

  getAllColumns() {
    return this.getFirstRow().all(by.tagName('td'));
  }

  updateTaskData() {

    browser.sleep(3000);
    element(by.id('TaskName')).clear().then(function() {
    element(by.id('TaskName')).sendKeys("Automated Task Updated").then(function () { });
    });

    var priority = element(by.id('TaskPriority'));
    browser.actions().dragAndDrop(priority, { x: 30, y: 0 }).perform();

    element(by.cssContainingText('option', 'Prepare for Tournament')).click();

    element(by.id('StartDate')).sendKeys("14-12-2018").then(function () { });
    element(by.id('EndDate')).sendKeys("15-12-2018").then(function () { });

    element(by.id('btnUpdate')).click().then(() => {
      browser.sleep(2000);      
    });
  }
}
