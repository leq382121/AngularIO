import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {

  // selectedHero: Hero;
  heroes: Hero[];

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(D => D !== hero);
    this.heroService.deleteHero(hero).subscribe();

    // If you neglect to subscribe(), the service will not send the
    // delete request to the server! As a rule, an Observable does
    // nothing until something subscribes!
  }
}

// Summary
// You used the CLI to create a second HeroesComponent.
// You displayed the HeroesComponent by adding it to the AppComponent shell.
// You applied the UppercasePipe to format the name.
// You used two-way data binding with the ngModel directive.
// You learned about the AppModule.
// You imported the FormsModule in the AppModule so that Angular would recognize and apply the ngModel directive.
// You learned the importance of declaring components in the AppModule and appreciated that the CLI declared it for you.
