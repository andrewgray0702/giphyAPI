import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  results;
  constructor(private http: HttpClient ) { }
  getGifs(searchTerm){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=qAODTUPuK8i3hRHTyApDGAUT8FyREnVy&q=${searchTerm}&limit=25&offset=0&rating=R&lang=en`);
  }
}
