import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  heroes: Hero[] = [];
  // isLoading = true;
  // 决定表格中要显示的列和顺序，必须是HERO类的属性名，否则报错
  displayedColumns: string[] = ['no', 'name', 'salary', 'description', 'isTop'];
  dataSource: MatTableDataSource<Hero>; // 表格数据源
  @ViewChild(MatPaginator, {static: true})  // 分页器
  paginator: MatPaginator;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getAllHeroes().subscribe(result => {
      // 返回的对象result中包括loading, error, 以及 data，其中data中有后台定义好的名称如getAllHeroes的数组
      this.heroes = result.data?.getAllHeroes;
      this.dataSource = new MatTableDataSource<Hero>(this.heroes);
      this.dataSource.paginator = this.paginator;
      // this.isLoading = result.loading;
      // this.isLoading = false;
    });
  }
}
