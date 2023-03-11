import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmSagrilaftComponent } from './adm-sagrilaft/adm-sagrilaft.component';


const routes: Routes = [
  {
    path: '',
    component: AdmSagrilaftComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SagrilaftRoutingModule { }
