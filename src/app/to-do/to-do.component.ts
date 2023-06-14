import { Component, OnInit } from '@angular/core';
import { TodoList } from '../service/todo.service';
import { Task } from '../share/task';

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

  constructor(private todoService: TodoList) {}

  ngOnInit(): void {
    this.getAllTodoList();
    this.editTaskValue = '';
    this.description = '';
  }

  addTodo(): void {
    this.taskObj.description = this.description;
    this.todoService.addTodoList(this.taskObj).subscribe(
      () => {
        this.ngOnInit();
        this.description = '';
      },
      error => {
        alert(error);
      }
    );
  }

  getAllTodoList(): void {
    this.todoService.getAllTodoList().subscribe(
      (tasks: Task[]) => {
        this.taskArr = tasks;
        console.log(this.taskArr);
      },
      error => {
        console.log('Unable to get list of tasks:', error);
        alert('Unable to get list of tasks');
      }
    );
  }

  activeTask(): void {
    this.todoService.getAllTodoList().subscribe(
      (tasks: Task[]) => {
        this.taskArr = tasks.filter(task => !task.status);
      },
      error => {
        alert("Unable to get list of tasks");
      }
    );
  }

  completedTask(): void {
    this.todoService.getAllTodoList().subscribe(
      (tasks: Task[]) => {
        this.taskArr = tasks.filter(task => task.status);
      },
      error => {
        alert("Unable to get list of tasks");
      }
    );
  }

  editTodoList(id: string): void {
    this.todoService.editTodoList(this.taskObj).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        alert("Failed to update task");
      }
    );
  }

  updateTodoStatus(todo: Task): void {
    const updatedTask: Task = { ...todo }; // Create a copy of the task object
    updatedTask.status = updatedTask.status; // Toggle the status
  
    this.todoService.updateStatus(todo.id, updatedTask).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        alert("Failed to update task status");
      }
    );
  }
  

  deleteTodoList(todo: Task): void {
    this.todoService.deleteTodoList(todo.id).subscribe(
      () => {
        this.taskArr = this.taskArr.filter(item => item.id !== todo.id);
      },
      error => {
        console.error('Failed to delete task:', error);
        alert('Failed to delete task');
      }
    );
  }

  call(data: Task): void {
    this.taskObj = data;
    this.editTaskValue = data.description;
  }
}
