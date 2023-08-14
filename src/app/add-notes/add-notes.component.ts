import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
})
export class AddNotesComponent {
  showValidationErrors!: boolean;
  constructor(
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {}

  onFormsSubmit(form: NgForm) {
    const note = new Note(form.value.title, form.value.content);
    console.log(note);
    if (form.invalid) return;

    this.noteService.addNote(note);
    this.router.navigateByUrl('/notes');
    this.notificationService.show('Created note!');
  }
}
