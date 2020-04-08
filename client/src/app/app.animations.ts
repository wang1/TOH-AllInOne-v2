import { trigger, transition, query, style, group, animate, keyframes } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 20,
        left: 20,
        width: '100%',
      }),
    ], { optional: true }),
    group([
      query(':enter', [
        animate(
          '1000ms ease',
          keyframes([
            style({ transform: 'scale(0) translateX(100%)' }),
            style({ transform: 'scale(0.5) translateX(50%)' }),
            style({ transform: 'scale(1) translateX(0%)' }),
          ]),
        ),
      ], { optional: true }),
      query(':leave', [
        animate(
          '500ms ease-in',
          style(
            { left: '-200%' }
          )
        ),
      ], { optional: true }),
    ]),
  ]),
]);
