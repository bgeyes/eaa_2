import { ReviewListApprovalComponent } from './review-list-approval/review-list-approval.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'reviews',
    component: ReviewListComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'approvals',
    component: ReviewListApprovalComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    component: ContactListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-contact',
    component: AddContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-review',
    component: AddReviewComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'contacts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
