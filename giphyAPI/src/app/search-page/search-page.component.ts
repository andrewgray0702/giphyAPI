import { Component, OnInit } from '@angular/core';
import { GifService } from '../services/gif.service';
import { interval, Observable, fromEvent, } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  gifs: Object[] = [];
  timer: Observable<number> = interval(1000)
  inputObs: Observable<string>;
  inputElement: any;
  constructor(private gifService: GifService) {
    
  }
 
  ngOnInit() {
    this.inputElement =  document.getElementById('searchBox');
    this.inputObs = fromEvent(this.inputElement, 'input').pipe(
      map(e => e['target'].value),
      filter( text => text.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    )
    this.inputObs.subscribe(val => 
      this.gifService.getGifs(val)
    .subscribe(res => this.gifs = res['data']));
    this.timer.subscribe()
  }

}
