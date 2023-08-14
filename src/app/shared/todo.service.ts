import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  todos: Todo[] = [];

  storagelistenSub: Subscription;
  constructor() {
    this.loadState();

    this.storagelistenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe((event: StorageEvent) => {
      if (event.key === 'todos') this.loadState();
    });
  }

  ngOnDestroy() {
    if (this.storagelistenSub) this.storagelistenSub.unsubscribe();
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find((t) => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos = this.todos || [];
    this.todos.push(todo);
    this.saveState();
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id);
    if (todo) {
      Object.assign(todo, updatedTodoFields);
      this.saveState();
    }
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index == -1) return;
    this.todos.splice(index, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos')!);
      // if (!todosInStorage) return;
      this.todos.length = 0; // clear the todos reference
      this.todos.push(...todosInStorage);
    } catch (e) {
      console.log('Error retriving the todos');
      console.log(e);
    }
  }
}
