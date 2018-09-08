import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  var originalTimeout;


  beforeEach(() => {
    page = new AppPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });


  it('should fill add & submit project form',() => {    
    page.navigateToAddProj();
    page.fillAddProjectForm();
    page.submitProjectForm();
  });

  it('should fill add & submit user form',() => {    
    page.navigateToAddUser();
    page.fillAddUserForm();    
  });

  it('should get the menu first element text', () => {
    page.navigateTo();
    expect(page.getMenuFirstEleText()).toEqual('Project Manager');
  });

  it('should fill add task form ', () => {
    page.navigateToAddTask();
    page.fillAddTaskForm();
    page.submitAddTask();
  });

it('should populate task in view form',() => {
  page.navigateToViewTask();
  
  element(by.id('btnProjSearchModal')).click().then(() => {
    browser.sleep(1000);
    element(by.id('btnProjSelect')).click().then(() => {
      browser.sleep(1000);
    });
  });
  page.getAllColumns().get(5).element(by.xpath('//a/button')).click();
});

it('should load data for edit',() => {
  page.updateTaskData();
});

  afterEach(function (done) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    browser.manage().logs().get('browser').then(function (browserLog) {
      var i = 0,
        severWarnings = false;

      for (i; i <= browserLog.length - 1; i++) {
        if (browserLog[i].level.name === 'SEVERE') {
          console.log('\n' + browserLog[i].level.name);
          //uncomment to see the full error
          console.log('(Possibly exception) \n' + browserLog[i].message);
          severWarnings = true;
        }
      }
      //expect(severWarnings).toBe(true);
      done();
    })
  });
});
