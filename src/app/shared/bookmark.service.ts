import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: Bookmark[] = [
    new Bookmark('google', 'https://google.com'),
    new Bookmark('youtube', 'https://youtube.com'),
  ];

  constructor() {}

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find((b) => b.id === id);
    console.log(id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
    console.log(this.bookmarks);
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);
    if (bookmark) {
      Object.assign(bookmark, updatedFields);
    }
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex((b) => b.id === id);
    if (bookmarkIndex == -1) return;
    this.bookmarks.splice(bookmarkIndex, 1);
  }
}
