import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './shared/graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from './shared/my-material.module';
import { HeroSearchComponent } from './hero/hero-search/hero-search.component';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { HeroAddComponent } from './hero/hero-add/hero-add.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { HeroTopComponent } from './hero/hero-top/hero-top.component';
import { HeroEditComponent } from './hero/hero-edit/hero-edit.component';
import { UserSingupComponent } from './user/user-singup/user-singup.component';
import { LoginComponent } from './auth/login/login.component';
import { myProviders } from './shared/my.providers';


@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    HeroAddComponent,
    HeroDetailComponent,
    HeroTopComponent,
    HeroEditComponent,
    HeroSearchComponent,
    LoginComponent,
    UserSingupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MyMaterialModule,
  ],
  providers: [ ...myProviders, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
