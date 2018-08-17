import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newRest = {};
  constructor(private _httpService: HttpService,
  private _router: Router) { }
  error = {};
  ngOnInit() {
  }
  newRestaurant() {
    let observable = this._httpService.newRestaurant(this.newRest);
    observable.subscribe(data => {
      console.log(data);
      if (data['status'] == 200) {
        this._router.navigate(['/restaurants']);
      } else {
        console.log("went in here")
        this.error = data['errors'];
      }
    })
  }

}
