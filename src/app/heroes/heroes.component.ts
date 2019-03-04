import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  heroes: Hero[];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
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
