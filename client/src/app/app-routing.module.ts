import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { HeroTopComponent } from './hero/hero-top/hero-top.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { HeroAddComponent } from './hero/hero-add/hero-add.component';
import { HeroEditComponent } from './hero/hero-edit/hero-edit.component';
import { HeroDetailResolverService } from './hero/hero-detail/hero-detail-resolver.service';


const routes: Routes = [
  {
    path: 'hero-list',
    component: HeroListComponent,
    data: { animation: 'ListPage' },
  },
  {
    path: 'hero-top',
    component: HeroTopComponent,
    data: { animation: 'TopPage' },
  },
  {
    path: 'hero-detail/:id',
    component: HeroDetailComponent,
    data: { animation: 'DetailPage' },
    // 注意使用了resolve预取数据, 且命名为result供组件使用
    //     在 hero-detail 中，它必须等待路由激活, 然后才能去获取对应的英雄。

    // 这种方式一般没有问题，但是如果你在使用真实 api，很有可能数据返回有延迟，导致无法即时显示。 在这种情况下，直到数据到达前，显示一个空的组件不是最好的用户体验(且浏览器控制台将出现undefined错误, 虽然最后得以成功显示)。

    // 其次, 到该组件的转场动画将不会生效.

    // 再者, 如果当前页面是英雄详情页面, 那么在搜索框中点击搜出的某个英雄本应导航到该英雄的详情页面(相同URL, 不同id), 但不会发生跳转!!!因为默认导航方式是: onsameurlnavigation: ignore, 而非 reload !

    // 因此, 它还有进步的空间。

    // 最好预先从服务器上获取完数据，这样在路由激活的那一刻数据就准备好了。 总之，你希望的是只有当所有必要数据都已经拿到之后，才渲染这个路由组件。

    // 我们需要 Resolve 守卫
    resolve: { result: HeroDetailResolverService}
  },
  {
    path: 'hero-add',
    component: HeroAddComponent,
    data: { animation: 'AddPage' },
  },
  {
    path: 'hero-edit/:id',
    component: HeroEditComponent,
    data: { animation: 'EditPage' },
  },
  {
    path: '',
    redirectTo: 'hero-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
