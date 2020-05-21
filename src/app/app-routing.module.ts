import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './Structure/login/login.component';
import {FrontPageComponent} from './Structure/front-page/front-page.component';
import {DashboardComponent} from './Structure/dashboard/dashboard.component';
import {PathDashComponent} from './Path/path-dash/path-dash.component';
import {TaskDashComponent} from './Task/task-dash/task-dash.component';
import {PathReadComponent} from './Path/PathCrud/path-read/path-read.component';
import {PathUpdateComponent} from './Path/PathCrud/path-update/path-update.component';
import {PathCreateComponent} from './Path/PathCrud/path-create/path-create.component';
import {PathCompositionComponent} from './PathComposition/path-composition/path-composition.component';
import {TaskReadComponent} from './Task/TaskCrud/task-read/task-read.component';
import {TaskUpdateComponent} from './Task/TaskCrud/task-update/task-update.component';
import {TaskCreateComponent} from './Task/TaskCrud/task-create/task-create.component';
import {PathAddComponent} from './PathComposition/path-add/path-add.component';
import {PathRemoveComponent} from './PathComposition/path-remove/path-remove.component';
import {PathTasksComponent} from './PathComposition/path-tasks/path-tasks.component';


const routes: Routes = [
  { path: 'front-page', component: FrontPageComponent},
  { path: '',   redirectTo: 'front-page', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'path', component: PathDashComponent, children: [
          { path: 'read', component: PathReadComponent},
          { path: 'update', component: PathUpdateComponent},
          { path: 'create', component: PathCreateComponent},
          { path: 'composition', component: PathCompositionComponent, children: [
              { path: 'add', component: PathAddComponent},
              { path: 'remove', component: PathRemoveComponent},
              { path: 'read', component: PathTasksComponent}
            ]}
        ]},
      { path: 'task', component: TaskDashComponent, children: [
          { path: 'read', component: TaskReadComponent},
          { path: 'update', component: TaskUpdateComponent},
          { path: 'create', component: TaskCreateComponent}
        ]}
    ]},
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
