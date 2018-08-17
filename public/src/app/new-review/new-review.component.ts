import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {
  id;
  newReviewInput = {};
  error={};
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
    });
  }
  newReview() {
    let observable = this._httpService.newReview(this.id, this.newReviewInput);
    observable.subscribe(data=> {
      console.log(data);
      this.error = data['errors'];
      if (data['status'] == 200) {
        this._router.navigate(['/restaurants', this.id]);
      }
    })
  }

}
