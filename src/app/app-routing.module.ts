import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { AuthGuard } from './auth/auth.guard';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { AddRecordComponent } from './record/add-record/add-record.component';
import { WildlifeCrimeComponent } from './wildlife-crime/wildlife-crime.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"sign-up",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"post",component:CreatePostComponent,  canActivate: [AuthGuard] },
  { path: 'view-post/:id', component: ViewPostComponent  },
  { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard]  },
  { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'add-record', component: AddRecordComponent,},// canActivate: [AuthGuard] },
  { path: 'report-crime', component: WildlifeCrimeComponent  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }