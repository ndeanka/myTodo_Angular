import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Task} from "../share/task";
import {Observable, map} from "rxjs";


@Injectable({ 
  providedIn: 'root'
})
export class TodoList {

  serviceURL: string;

  constructor(private http: HttpClient) {
    // this.serviceURL = "http://localhost:3000/myTodoList/"   
    this.serviceURL = 'https://todolist-f6b44-default-rtdb.firebaseio.com/todolist.json'
  }

  addTodoList(description: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, description)
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
        console.log(todoList);
        return todoList;
      })
    );
  }
  
  deleteTodoList(id: string): Observable<void> {
    // const url = `${this.serviceURL}/${id}`;
    const url = 'https://todolist-f6b44-default-rtdb.firebaseio.com/todolist/'+id+'.json';

    return this.http.delete<void>(url);
  }
  

  editTodoList(description: Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL + '/' + description.id, description);
  }

  // updateStatus(status: Task): Observable<Task> {
  //   return this.http.put<Task>(`${this.serviceURL}/${status.id}`, status);
  // }

  updateStatus(status: Task): Observable<Task> {
    const url = `${this.serviceURL}/${status.id}.json`;
    return this.http.put<Task>(url, status);
  }
}
