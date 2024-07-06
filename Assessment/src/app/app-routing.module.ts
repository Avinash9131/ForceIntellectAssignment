
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJobComponent } from './HR/Job/add-job/add-job.component';
import { AddProjectsComponent } from './HR/projects/add-projects/add-projects.component';




const routes: Routes = [
  { path: 'hr/jobs/add-new-job', component: AddJobComponent },
  { path: 'hr/projects/add-projects', component: AddProjectsComponent },  //-----------------------
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }