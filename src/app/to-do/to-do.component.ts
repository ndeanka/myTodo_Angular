import {Component, OnInit} from '@angular/core';
import {TodoList} from '../service/todo.service';
import {Task} from "../share/task";

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

  constructor(private todoService: TodoList) {
  }

  ngOnInit(): void {
    this.taskArr = [];
    this.getAllTodoList();
    this.editTaskValue = '';
    this.description = '';
  }

  addTodo(): void {
    this.taskObj.description = this.description;
    this.todoService.addTodoList(this.taskObj).subscribe(val => {
      this.ngOnInit();
      this.description = '';
      console.log(this.description)
    }, error => {
      alert(error);
    });
  }

  getAllTodoList() {
    this.todoService.getAllTodoList().subscribe(val => {
      this.taskArr = val;
    }, error => {
      alert("Unable to get list of tasks");
    });
  }

  activeTask() {
    this.todoService.getAllTodoList().subscribe(
      val => {
        this.taskArr = val.filter(task => !task.status);
      },
      error => {
        alert("Unable to get list of tasks");
      }
    );
  }

  completedTask() {
    this.todoService.getAllTodoList().subscribe(
      val => {
        // Filtering the tasks
        this.taskArr = val.filter(task => task.status); // Assigning the filtered tasks to taskArr
      },
      error => {
        alert("Unable to get list of tasks");
      }
    );
  }

  editTodoList() {
    this.todoService.editTodoList(this.taskObj).subscribe(val => {
      this.ngOnInit();
    }, error => {
      alert("Failed to update task");
    });
  }

  updateTodoStatus(todo: any) {
    console.log(todo)
    this.todoService.updateStatus(todo).subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteTodoList(todo: Task): void {
    this.todoService.deleteTodoList(todo.id).subscribe(
      (response) => {
        console.log(response, '-----------')
        this.taskArr = this.taskArr.filter(item => item.id !== todo.id);
      },
      error => {
        console.log(error)
        console.error('Failed to delete task:', error);
        alert('Failed to delete task');
      }
    );
  }


  call(data: Task) {
    this.taskObj = data;
    this.editTaskValue = data.description;
  }
}
