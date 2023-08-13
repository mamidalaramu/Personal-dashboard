import { Component } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss'],
})
export class EditBookmarkComponent {
  bookmark: Bookmark | any;
  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id');
      if (bookmarkId)
        this.bookmark = this.bookmarkService.getBookmark(bookmarkId);
    });
  }

  onFormsSubmit(form: NgForm) {
    const { name, url } = form.value;
    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name,
      url: new URL(url),
    });
  }

  deleteBookmark() {
    this.bookmarkService.deleteBookmark(this.bookmark.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  cancleBookmark() {
    this.router.navigateByUrl('bookmarks');
  }
}
