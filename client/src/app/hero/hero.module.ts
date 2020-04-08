import { NgModule } from '@angular/core';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroAddComponent } from './hero-add/hero-add.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroTopComponent } from './hero-top/hero-top.component';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@NgModule({
  declarations: [
    HeroListComponent,
    HeroAddComponent,
    HeroDetailComponent,
    HeroTopComponent,
    HeroEditComponent,
    HeroSearchComponent,
  ],
  imports: [

  ]
})
export class HeroModule { }
