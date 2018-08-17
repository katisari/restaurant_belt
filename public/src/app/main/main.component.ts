import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  restaurants;
  pressed_edit = false;
  constructor(private _httpService: HttpService) { }
  pressed_rest='';

  ngOnInit() {
    this.getRestaurant();
  }

  ngOnChanges() {
    this.getRestaurant();
  }
  getRestaurant() {
    let observable = this._httpService.getRestaurant();
    observable.subscribe(data=> {
      this.restaurants = data['data'];
      var current_date = new Date();
      for (var rest of this.restaurants) {
        var specdate = new Date(rest.createdAt);
        if ((current_date.getTime()-specdate.getTime())/1000 > 30) {
          rest['canDelete'] = false;
        } else {
          rest['canDelete'] = true;
        }
      }
    })
  }
  deleteRest(id) {
    let observable = this._httpService.deleteRest(id);
    observable.subscribe(data => {
      this.getRestaurant();
    });
  }
  remove_all() {
    let observable = this._httpService.remove_all();
    observable.subscribe(data => {
      this.getRestaurant();
    });
  }
  editPressed(rest) {
    this.pressed_edit = true;
    this.pressed_rest = rest;
    this.ngOnInit;
  }

}
