import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-bookmark-title',
  templateUrl: './bookmark-title.component.html',
  styleUrls: ['./bookmark-title.component.scss'],
})
export class BookmarkTitleComponent {
  @Input() bookmark: Bookmark;
  titleIconSrc: string;

  faviconError: boolean;

  ngOnInit(): void {
    this.titleIconSrc = this.bookmark.url.origin + '/favicon.ico';
  }
}
