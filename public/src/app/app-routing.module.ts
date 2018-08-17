import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { MainComponent } from './main/main.component';
import { AllreviewsComponent } from './allreviews/allreviews.component';
import { NewReviewComponent } from './new-review/new-review.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/restaurants'},
  {path: 'restaurants', component: RestaurantsComponent, children: [
    {path: 'new', component: NewComponent},
    {path: '', component: MainComponent},
    {path: ':id/review', component: NewReviewComponent},
    
    {path: ':id', component: AllreviewsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
