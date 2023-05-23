import {Component, OnInit} from '@angular/core';
import {TodoList} from '../service/todo.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  description: string = "";
  status: string = "";
  myMassege: string = "";

  constructor(private _todoService: TodoList) {
  }

  myTodoList: { description: string, status: string }[] = [];

  ngOnInit(): void {
    this.myTodoList = this._todoService.myTodoList;
  }

  addTodo(): void {
    this.status = '';
    this._todoService.addTodoList(this.description, this.status)
    this.myMassege = 'success';
  }

}
