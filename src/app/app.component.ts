import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, top: '-4px'}),
        animate(150, style({opacity: 1, top: '0px'}))
      ]),
      transition(':leave', [
        animate(150, style({opacity: 0, top: '-4px'}))
      ])
    ])
  ],
})
export class AppComponent implements OnInit {
  spinner = false;

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      const meta = this.document.createElement('meta');
      meta.name = 'theme-color';

      const metaThemeColor = this.document.querySelector('meta[name=theme-color]');


      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (darkModeMediaQuery.matches) {
        // metaThemeColor.setAttribute('content', '#272727');
        meta.content = '#272727';
      } else {
        meta.content = '#fff';
      }

      this.document.head.appendChild(meta);

      darkModeMediaQuery.addListener((e) => {
        const darkModeOn = e.matches;
        if (darkModeOn) {
          metaThemeColor.setAttribute('content', '#272727');
        } else {
          metaThemeColor.setAttribute('content', '#fff');
        }
      });
    }


    router.events.subscribe(event => {
      if (event instanceof ResolveStart) {
        this.spinner = true;
      }

      if (event instanceof ResolveEnd) {
        this.spinner = false;
      }
    });
  }

  ngOnInit(): void {
  }
}
