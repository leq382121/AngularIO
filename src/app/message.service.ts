import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  constructor() { }
}


// You refactored data access to the HeroService class.
// You registered the HeroService as the provider of its service at the root level so that it can be injected anywhere in the app.
// You used Angular Dependency Injection to inject it into a component.
// You gave the HeroService get data method an asynchronous signature.
// You discovered Observable and the RxJS Observable library.
// You used RxJS of() to return an observable of mock heroes (Observable<Hero[]>).
// The component's ngOnInit lifecycle hook calls the HeroService method, not the constructor.
// You created a MessageService for loosely-coupled communication between classes.
// The HeroService injected into a component is created with another injected service, MessageService.
