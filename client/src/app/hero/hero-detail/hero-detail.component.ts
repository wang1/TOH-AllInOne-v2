import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  // 以前生成空的Hero对象, 由于取数据的延迟, 可能导致undefined错误
  // 现在使用resolve方式, 不存在该问题了
  hero: Hero;
  // isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private heroService: HeroService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    // 该路由激活时设置了守卫，在守卫中预取了某英雄的数据, 按路由模块中该守卫路由的设定，名为result。故从result中取数据
    this.activatedRoute.data.subscribe(({ result }) => {
      this.hero = result.data.getOneHeroById;
    });
  }

  deleteHero() {

    this.heroService.deleteHeroById(this.hero.id).subscribe(() => {

      this.sharedService.openSnackBar(`${this.hero.name}成功删除!`);
      this.location.back();
    });
  }

}
