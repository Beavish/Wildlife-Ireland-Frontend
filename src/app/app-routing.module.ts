import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"sign-up",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"post",component:CreatePostComponent},
  { path: 'view-post/:id', component: ViewPostComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }