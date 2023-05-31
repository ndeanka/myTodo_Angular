import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Task} from "../share/task";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TodoList {

  serviceURL: string;

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/myTodoList/"
  }

  addTodoList(description: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, description)
  }

  getAllTodoList(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL)
  }

  deleteTodoList(id: number): Observable<void> {
    const url = `${this.serviceURL}/${id}`;
    return this.http.delete<void>(url);
  }




  editTodoList(description: Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL + '/' + description.id, description);
  }

  updateStatus(status: Task): Observable<Task> {
    return this.http.put<Task>(`${this.serviceURL}/${status.id}`, status);
  }
}
