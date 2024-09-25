import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import {Todo} from 'src/app/models/todo.interface'
import {NewTodo} from 'src/app/models/new-todo.interface'

@Injectable({
  providedIn: 'root'
})
export class TodoFacadeService {
  private readonly apiService = inject(ApiService);
  get():Observable<Todo[]>{
    return this.apiService.get()
  }
  create(todo:NewTodo): Observable<Todo>{
    return this.apiService.create(todo)
  }
  edit(todo: Todo): Observable<Todo>{
    return this.apiService.edit(todo)
  }
}
