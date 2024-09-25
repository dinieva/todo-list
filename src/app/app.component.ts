import { TuiRootModule, TuiDialogModule, TuiAlertModule } from "@taiga-ui/core";
import { Component,  OnInit, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import {TodoFormComponent} from "./components/todo-form/todo-form.component"
import { TodoListComponent } from "./components/todo-list/todo-list.component";

@Component({
  standalone: true,
  imports: [ CommonModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TodoFormComponent, TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  
})
export class AppComponent { //implements OnInit
  title = 'todo';
}
