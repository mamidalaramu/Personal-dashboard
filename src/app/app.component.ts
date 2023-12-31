import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  group,
} from '@angular/animations';
import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const baseStyles = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),
        query(':enter, :leave', [baseStyles], { optional: true }),
        group([
          query(
            ':leave',
            [
              animate(
                '250ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(-50px)',
                })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateX(50px)',
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),
        query(':enter, :leave', [baseStyles], { optional: true }),
        group([
          query(
            ':leave',
            [
              animate(
                '250ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(50px)',
                })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateX(-50px)',
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      // state to secondary state
      transition('* => secondary', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),
        query(':enter, :leave', [baseStyles], { optional: true }),
        group([
          query(
            ':leave',
            [
              animate(
                '250ms ease-in',
                style({
                  opacity: 0,
                  transform: 'scale(0.8)',
                })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'scale(1.2)',
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'scale(1)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      // secondary state to
      transition('secondary => *', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),
        query(':enter, :leave', [baseStyles], { optional: true }),
        group([
          query(
            ':leave',
            [
              animate(
                '250ms ease-in',
                style({
                  opacity: 0,
                  transform: 'scale(1.25)',
                })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'scale(0.8)',
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'scale(1)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
    trigger('bgAnimation', [
      transition(':leave', [
        animate(
          1000,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          250,
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        animate(
          250,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  backgroundImage: string[] = [
    'https://plus.unsplash.com/premium_photo-1673706007413-9f6ede022596?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjgwMDcxNQ&ixlib=rb-4.0.3&q=80&w=1920',
  ];
  loadingBgImage: boolean;

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab'];
      if (!tab) return 'secondary';
      return tab;
    }
  }

  async changeBgImage(): Promise<any> {
    this.loadingBgImage = true;
    const result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD',
    });
    const currentImage = this.backgroundImage.includes(result.url);
    if (currentImage) {
      return this.changeBgImage();
    }
    this.backgroundImage.push(result.url);
  }

  onBgImageLoad(imgEvent: Event) {
    //remove old BG Image from backgound
    const imgElement = imgEvent.target as HTMLImageElement;
    const src = imgElement.src;
    this.backgroundImage = this.backgroundImage.filter((b) => b === src);
    this.loadingBgImage = false;
  }

  dateTime: Observable<Date>;
  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    );
  }

  returnHome() {
    this.router.navigateByUrl('/');
  }
}
