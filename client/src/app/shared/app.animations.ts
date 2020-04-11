import { trigger, transition, query, style, group, animate, keyframes } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        // 因根组件样式设置了左右边距，此处必须一致，否则发生抖动
        left: 20,
        right: 20,
        // width: '100%',
      }),
    ], { optional: true }),
    group([
      query(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ], { optional: true }),
      query(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ], { optional: true }),
    ]),
  ]),
]);
