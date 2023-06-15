import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../share/task";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({ 
  providedIn: 'root'
})
export class TodoList {

  // serviceURL: string;
  private serviceURL = environment.apiUrl;
  

  constructor(private http: HttpClient) {
    this.serviceURL = 'https://todolist-f6b44-default-rtdb.firebaseio.com/todolist.json';
  }

  addTodoList(description: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, description);
  }

  getAllTodoList(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL).pipe(
      map(res => {
        const todoList: Task[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            todoList.push({ ...res[key], id: key });
          }
        }
        return todoList;
      })
    );
  }
  
  deleteTodoList(id: string): Observable<void> {
    const url = `https://todolist-f6b44-default-rtdb.firebaseio.com/todolist/${id}.json`;
    return this.http.delete<void>(url);
  }
  
  editTodoList(description: Task): Observable<Task> {
    const url = `${this.serviceURL}/${description.id}.json`;
    return this.http.put<Task>(url, description);
  }
  
  updateStatus(id: string, status: Task): Observable<Task> {
    const url = `https://todolist-f6b44-default-rtdb.firebaseio.com/todolist/${id}.json`;
    // const url =`${this.serviceURL}/${id}.json`;
    return this.http.put<Task>(url, status);
  }

}
 