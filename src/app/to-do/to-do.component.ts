import {Component, OnInit} from '@angular/core';
import {TodoList} from '../service/todo.service';
import {Task} from "../share/task";
import {Router} from "@angular/router";


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  description: string = "";
  editTaskValue: string = "";

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  status: string = "";

  constructor(private todoService: TodoList) {
  }


  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTodoList();
    this.editTaskValue = '';
    this.description = '';
  }

  addTodo(): void {
    this.taskObj.description = this.description;
    this.todoService.addTodoList(this.taskObj).subscribe(val => {
      this.ngOnInit()
      this.description = '';

    }, error => {
      alert(error);
    })
  }

  getAllTodoList() {
    this.todoService.getAllTodoList().subscribe(val => {
      const active = this.taskArr = val;
    }, error => {
      alert("Unable to get list of tasks")
    })
  }

  activeTask() {
    this.todoService.getAllTodoList().subscribe(
      val => {
        const active = val.filter(task => task.status === ''); // Filtering the tasks
        this.taskArr = active; // Assigning the filtered tasks to taskArr
      },
      error => {
        alert("Unable to get list of tasks");
      }
    );

  }

  completedTask() {
    this.todoService.getAllTodoList().subscribe(
      val => {
        const active = val.filter(task => task.status !== ''); // Filtering the tasks
        this.taskArr = active; // Assigning the filtered tasks to taskArr
      },
      error => {
        alert("Unable to get list of tasks");
      }
    );
  }

  editTodoList() {
    this.taskObj.description = this.editTaskValue;
    this.todoService.editTodoList(this.taskObj).subscribe(val => {
      this.ngOnInit();
    }, error => {
      alert("Fail to update task");
    })
  }

  deleteTodoList(data: Task) {
    this.todoService.deleteTodoList(data).subscribe(() => {
      this.ngOnInit();
    }, () => {
      alert("Failed to delete task");
    });
  }

  call(data: Task) {
    this.taskObj = data;
    this.editTaskValue = data.description;
  }

  protected readonly Task = Task;
}
