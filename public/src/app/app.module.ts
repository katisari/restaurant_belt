import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewComponent } from './new/new.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NewReviewComponent } from './new-review/new-review.component';
import { EditComponent } from './edit/edit.component';
import { AllreviewsComponent } from './allreviews/allreviews.component';
import { MainComponent } from './main/main.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    RestaurantsComponent,
    NewReviewComponent,
    EditComponent,
    AllreviewsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
