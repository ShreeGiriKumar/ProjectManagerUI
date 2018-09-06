import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddComponent } from './UI/addtask/addtask.component';
import { MenuComponent } from './UI/menu/menu.component';
import { ViewComponent } from './UI/viewtask/viewtask.component';
import { EditComponent } from './UI/edittask/edittask.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './ui/user/user.component';
import { ProjectComponent } from './ui/project/project.component';
import { SortingPipe } from './pipe/sorting.pipe';


const routes: Routes = [
  { path: 'AddTask', component: AddComponent },
  { path: 'EditTask', component: EditComponent },
  { path: 'ViewTask', component: ViewComponent },
  { path: 'EditTask/:id/:parentInd', component: EditComponent },
  { path: 'User', component: UserComponent },
  { path: 'Project', component: ProjectComponent },  
  { path: '', redirectTo: '/AddTask', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    MenuComponent,
    ViewComponent,
    EditComponent,
    UserComponent,
    ProjectComponent,    
    SortingPipe
  ],
  exports: [ RouterModule ],
  imports: [
    BrowserModule,
    FormsModule,  
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],  
  providers: [],
  bootstrap: [AppComponent],    
})
export class AppModule { }
