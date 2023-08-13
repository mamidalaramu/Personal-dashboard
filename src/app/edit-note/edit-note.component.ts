import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  DefaultExport,
  ParamMap,
  Router,
} from '@angular/router';
import { NoteService } from '../shared/note.service';
import { NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  note: Note | any;
  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')!;
      console.log(idParam);
      this.note = this.noteService.getNote(idParam);
      console.log(this.note);
    });
  }
  onFormsSubmit(form: NgForm) {
    const id = this.note ? this.note.id : '';
    this.noteService.updateNote(id, form.value);
    this.router.navigateByUrl('/notes');
    console.log(form.value);
    console.log(this.note)
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id);
    this.router.navigateByUrl('/notes');
  }
}
