import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() pressed_restaurant: any;
  restInfo = {};
  errors = {};
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _maincomponent: MainComponent
  ) { }

  ngOnInit() {
    this.restInfo = {name: this.pressed_restaurant['name'], cuisine: this.pressed_restaurant['cuisine']};
  }
  ngOnChanges() {
    this.restInfo = {name: this.pressed_restaurant['name'], cuisine: this.pressed_restaurant['cuisine']};
  }

  updateRestaurant() {
    let observable = this._httpService.updateRestaurant(this.pressed_restaurant._id, this.restInfo);
    observable.subscribe(data => {
      console.log(data);
      if (data['status'] == 200) {
        this._router.navigate(['/restaurants']);
      } else {
        this.errors = data['errors'];
      }
      this._maincomponent.getRestaurant();
    });
  }

}
