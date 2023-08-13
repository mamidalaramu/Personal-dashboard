import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
})
export class AddNotesComponent {
  showValidationErrors!: boolean;
  constructor(private noteService: NoteService, private router: Router) {}
  ngOnInit(): void {}

  onFormsSubmit(form: NgForm) {
    const note = new Note(form.value.title, form.value.content);
    console.log(note);
    if (form.invalid) return;

    this.noteService.addNote(note);
    this.router.navigateByUrl('/notes');
  }
}
