import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  // this uses selected hero class which has been defined in heroes component
  // and fires the function degined in heroes component

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // +converts string to number

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}

// What we did?

// Refactoring the original HeroesComponent into two components yields benefits, both now and in the future:
// You simplified the HeroesComponent by reducing its responsibilities.
// You can evolve the HeroDetailComponent into a rich hero editor without touching the parent HeroesComponent.
// You can evolve the HeroesComponent without touching the hero detail view.
// You can re-use the HeroDetailComponent in the template of some future component.

// Summary

// You created a separate, reusable HeroDetailComponent.
// You used a property binding to give the parent HeroesComponent control over the child HeroDetailComponent.
// You used the @Input decorator to make the hero property available for binding by the external HeroesComponent.
