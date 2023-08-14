import { Injectable, OnDestroy } from '@angular/core';
import { Bookmark } from './bookmark.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService implements OnDestroy {
  bookmarks: Bookmark[] = [];

  storagelistenSub: Subscription;

  constructor() {
    this.loadState();

    this.storagelistenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe((event: StorageEvent) => {
      if (event.key === 'bookmarks') this.loadState();
    });
  }

  ngOnDestroy() {
    if (this.storagelistenSub) this.storagelistenSub.unsubscribe();
  }

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
    this.saveState();
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);
    if (bookmark) {
      Object.assign(bookmark, updatedFields);
      this.saveState();
    }
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex((b) => b.id === id);
    if (bookmarkIndex == -1) return;
    this.bookmarks.splice(bookmarkIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const bookmarksInStorage = JSON.parse(
        localStorage.getItem('bookmarks')!,
        (key, value) => {
          if (key == 'url') return new URL(value);
          return value;
        }
      );
      if (!bookmarksInStorage) return;
      this.bookmarks.length = 0; // clear the bookmarks array (while keeping reference)
      this.bookmarks.push(...bookmarksInStorage);
    } catch (e) {
      console.log('Error retriving the Bookmarks');
      console.log(e);
    }
  }
}
