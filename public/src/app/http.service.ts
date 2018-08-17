import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  newRestaurant(newRest){
    return this._http.post('/create', newRest);
  }
  getRestaurant() {
    return this._http.get('/get_restaurant');
  }
  newReview(id, newReview) {
    return this._http.post(`/create_review/${id}`, newReview);
  }
  getReviews(id) {
    return this._http.get(`/get_reviews/${id}`);
  }
  getOne(id) {
    return this._http.get(`/get_one/${id}`);
  }
  updateRestaurant(id, info) {
    return this._http.put(`/update_rest/${id}`, info);
  }
  deleteRest(id) {
    return this._http.delete(`/delete_rest/${id}`);
  }
  remove_all() {
    return this._http.delete('/delete_all');
  }
}
