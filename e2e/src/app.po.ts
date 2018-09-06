import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('/');
  }

  navigateToView() {
    return browser.get('/View');
  }
  getMenuFirstEleText() {
    return element(by.css('app-menu a')).getText();
  }

  fillAddTaskForm() {
    element(by.id('TaskName')).sendKeys("Automated Task").then(function () { });
    var priority = element(by.id('TaskPriority'));

    browser.actions().dragAndDrop(priority, { x: 50, y: 0 }).perform();

    element(by.id('ParentTask')).sendKeys("Parent Automated Task").then(function () { });
    element(by.id('StartDate')).sendKeys("18-08-2018").then(function () { });
    element(by.id('EndDate')).sendKeys("19-08-2018").then(function () { });
  }

  submitAddTask() {
    element(by.id('btnAddTask')).click().then(() => {
      browser.sleep(2000);      
    });
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

  updateTaskData(){
    element(by.id('TaskName')).clear().then(function() {
      element(by.id('TaskName')).sendKeys("Automated Task").then(function () { })
    });

    var priority = element(by.id('TaskPriority'));
    browser.actions().dragAndDrop(priority, { x: 60, y: 0 }).perform();

    element(by.id('ParentTask')).clear().then(function() {
    element(by.id('ParentTask')).sendKeys("Parent Automated Task").then(function () { });
    });

    element(by.id('StartDate')).sendKeys("18-08-2018").then(function () { });
    element(by.id('EndDate')).sendKeys("19-08-2018").then(function () { });

    element(by.id('btnUpdate')).click().then(() => {
      browser.sleep(7000);      
    });
  }
}
