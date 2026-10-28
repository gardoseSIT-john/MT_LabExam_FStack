import { Routes } from '@angular/router';
import { LeaderList } from './components/leader-list/leader-list';
import { LeaderFormComponent } from './components/leader-form/leader-form';

export const routes: Routes = [
    {
        path:'leaders',
        component:LeaderList
    },
    {
        path:'leaders/new',
        component:LeaderFormComponent
    },
    {
        path:'',
        redirectTo:'leaders',
        pathMatch:'full'
    }


];
