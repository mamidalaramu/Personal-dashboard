import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  showValidationErrors!: boolean;
  constructor(
    private todoService: TodoService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  onFormsSubmit(form: NgForm) {
    const todo = new Todo(form.value.text);
    console.log(todo);
    if (form.invalid) return;

    this.todoService.addTodo(todo);
    this.router.navigateByUrl('/todos');
    this.notificationService.show('Todo created!');
  }
}
