import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { JobStatusComponent } from './job-status/job-status.component';
import { LocationComponent } from './location/location.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationFormComponent } from './application-form/application-form.component';

export const routes: Routes = [
    { path : '', component: ApplicationComponent },
    { path : 'job-status', component: JobStatusComponent },
    { path : 'location', component: LocationComponent},
    { path : 'form/:id', component: ApplicationFormComponent },
    { path : '**', component: NotFoundComponent }
];
