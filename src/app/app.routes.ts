import { Routes } from '@angular/router';
import { LeaderList } from './components/leader-list/leader-list';
import { LeaderFormComponent } from './components/leader-form/leader-form';
import { Home } from './components/home/home';
import { NotFoundComponent } from './components/notfound/notfound';

export const routes: Routes = [
    {
        path:'', component:Home
    },
    {
        path:'leaders',
        component:LeaderList
    },
    {
        path:'leaders/new',
        component:LeaderFormComponent
    },
    {path:'leaders/:id/edit', component:LeaderFormComponent},
    {
        path:'',
        redirectTo:'leaders',
        pathMatch:'full'
    },{
    path: '**',
    component:NotFoundComponent
  }


];
