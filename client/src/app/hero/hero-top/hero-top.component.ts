import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-top',
  templateUrl: './hero-top.component.html',
  styleUrls: ['./hero-top.component.scss']
})
export class HeroTopComponent implements OnInit {

  topHeroes: Hero[] = [];
  isLoading = true;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getTopHeroes().subscribe(({ data }) => {
      this.topHeroes = data.getTopHeroes;
      this.isLoading = false;
    });
  }

}
