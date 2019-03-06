import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})

export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  // You can subscribe to a Subject as you would any Observable.

  // You can also push values into that Observable by calling
  // its next(value) method as the search() method does.

  // The search() method is called via an event binding to the textbox's input event.

  constructor(private heroService: HeroService) { }

  // push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   *
   * Passing a new search term directly to the searchHeroes() after every user
   * keystroke would create an excessive amount of HTTP requests, taxing server
   * resources and burning through the cellular network data plan.
   *
   * Instead, the ngOnInit() method pipes the searchTerms observable
   * through a sequence of RxJS operators that reduce the number of calls
   * to the searchHeroes(), ultimately returning an observable of timely hero
   * search results (each a Hero[]).
   */

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(

      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      // and ensures that a request is sent only if the filter text changed.
      distinctUntilChanged(),

      // calls the search service for each search term that makes
      // it through debounce and distinctUntilChanged.

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))

      // switchMap() preserves the original request order while returning
      // only the observable from the most recent HTTP method call. Results
      // from prior calls are canceled and discarded.

      // Note that canceling a previous searchHeroes() Observable doesn't
      // actually abort a pending HTTP request. Unwanted results are simply
      // discarded before they reach your application code.
    );
  }
}
