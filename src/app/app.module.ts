import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathCompositionComponent } from './PathComposition/path-composition/path-composition.component';
import { PathAddComponent } from './PathComposition/path-add/path-add.component';
import { PathRemoveComponent } from './PathComposition/path-remove/path-remove.component';
import { PathDashComponent } from './Path/path-dash/path-dash.component';
import { PathReadComponent } from './Path/PathCrud/path-read/path-read.component';
import { PathCreateComponent } from './Path/PathCrud/path-create/path-create.component';
import { PathUpdateComponent } from './Path/PathCrud/path-update/path-update.component';
import { TaskUpdateComponent } from './Task/TaskCrud/task-update/task-update.component';
import { TaskCreateComponent } from './Task/TaskCrud/task-create/task-create.component';
import { TaskReadComponent } from './Task/TaskCrud/task-read/task-read.component';
import { TaskDashComponent } from './Task/task-dash/task-dash.component';
import { HeaderComponent } from './Structure/header/header.component';
import { LoginComponent } from './Structure/login/login.component';
import { FrontPageComponent } from './Structure/front-page/front-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PathCompositionComponent,
    PathAddComponent,
    PathRemoveComponent,
    PathDashComponent,
    PathReadComponent,
    PathCreateComponent,
    PathUpdateComponent,
    TaskUpdateComponent,
    TaskCreateComponent,
    TaskReadComponent,
    TaskDashComponent,
    HeaderComponent,
    LoginComponent,
    FrontPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
