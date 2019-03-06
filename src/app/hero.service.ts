// import {  } from '';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // T = Type parameter
      // it can return the safe value as the type that the app expects

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let's keep the app running by returning an empty result
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes

    // return of(HEROES); //used when faked data
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fethed heroes')), // tapping is like step between other steps
        catchError(this.handleError('getHeroes', []))
      );

      // https://stackblitz.com/edit/typescript-cd2gjp?file=index.ts&devtoolsheight=100

    // This particular HttpClient.get call returns an Observable<Hero[]>,
    // literally "an observable of hero arrays".
    // In practice, it will only return a single hero array.

    // HttpClient.get returns the body of the response as an untyped
    // JSON object by default. Applying the optional type specifier,
    // <Hero[]> , gives you a typed result object
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the heroes

    const url = `${this.heroesUrl}/${id}`;
    // it constructs a request URL with the desired hero's id.

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))

      // the server should respond with a single hero rather than an array of heroes.
      // therefore, getHero returns an Observable<Hero>
      // ("an observable of Hero objects") rather than an observable of hero arrays
    );


    // console.log('herojai: ', HEROES);
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
  }

  // This is a typical "service-in-service" scenario: you inject the MessageService
  // into the HeroService which is injected into the HeroesComponent.

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {

  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}


/** ----- */
// TODO
// Although not discussed here, there's an example of map in
// the getHeroNo404() method included in the sample source code.
