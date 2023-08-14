import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { NavigationCancellationCode } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy {
  notes: Note[] = [];

  storagelistenSub: Subscription;

  constructor() {
    this.loadState();

    this.storagelistenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe((event: StorageEvent) => {
      if (event.key === 'notes') this.loadState();
    });
  }

  ngOnDestroy() {
    if (this.storagelistenSub) this.storagelistenSub.unsubscribe();
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find((n) => n.id === id);
  }

  addNote(note: Note) {
    this.notes = this.notes || [];
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    if (note) {
      Object.assign(note, updatedFields);
      this.saveState();
    }
  }
  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex == -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes')!);
      if (!notesInStorage) return;
      this.notes.length = 0; // clear the notes reference
      this.notes.push(...notesInStorage);
    } catch (e) {
      console.log('Error retriving the notes');
      console.log(e);
    }
  }
}
