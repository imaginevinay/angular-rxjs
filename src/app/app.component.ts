import { Component, VERSION, OnInit } from '@angular/core';
import { interval, of, fromEvent, Subject, Observable } from 'rxjs';
import {
  take,
  map,
  filter,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
// import {  } from 'rxjs/Subject'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  searchText: any = new Subject<string>();
  results: Observable<any>;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    // const num = interval(1000).pipe(
    //   take(5),
    //   map(x => x * 10),
    //   filter(x => x > 20)
    // );
    // const num = interval(1000);
    // const letters = of('a', 'b', 'c', 'd', 'e');
    // letters.pipe(switchMap(l => num.pipe(take(5), map(n => l+n)))).subscribe(data=> console.log(data))
    // fromEvent(document, 'click').subscribe(data => console.log(data));

    this.results = this.searchText.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchText => this.queryApi(searchText))
    );
  }

  queryApi(searchString) {
    console.log('queryapi', searchString);
    return this.http
      .get(`https://www.reddit.com/r/aww/search.json?q=${searchString}`)
      .pipe(map(res => res['data']['children']));
  }

  onChangeEvent(event) {
    // console.log(event.target.value);
    this.searchText.next(event.target.value);
  }
}

/**
 * These will give/create observables
 * Observables,
 * Subject, BehaviourSubject, ReplaySubject,
 * interval,
 * of,
 * fromEvent
 *
 * These will modiify observables on the go
 * take(<number>)
 * map(<x => x*10 // or any function >)
 * swicthMap() to get latest chnaged value
 * filter() // just like js.filter
 * debounceTime(<time in ms>) to delay
 * distinctUntilChanged()
 */
