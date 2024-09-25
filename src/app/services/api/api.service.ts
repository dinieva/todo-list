import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Todo} from 'src/app/models/todo.interface'
import {NewTodo} from 'src/app/models/new-todo.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';
  
  get():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.url) // операция получения данных
  }

  create(todo: NewTodo): Observable<Todo>{
    return this.http.post<Todo>(this.url, todo) // операция добавления данных
  }

  edit(todo: Todo): Observable<Todo>{
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo)
  }
}
