import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent {
  bookmarks: Bookmark[];
  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }
}
