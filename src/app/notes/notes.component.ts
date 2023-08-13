import { Component } from '@angular/core';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  notes: Note[];

  constructor(private noteService: NoteService) {}
  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }
}
