import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-allreviews',
  templateUrl: './allreviews.component.html',
  styleUrls: ['./allreviews.component.css']
})
export class AllreviewsComponent implements OnInit {
  id;
  all_reviews = [];
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getReviews;
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.getReviews();
  }
  getReviews() {
    let observable = this._httpService.getReviews(this.id);
    observable.subscribe(data => {
      this.all_reviews = data['message'];
      // console.log(this.all_reviews)
    })
  }


}
