import { TuiRootModule, TuiDialogModule, TuiAlertModule } from "@taiga-ui/core";
import { Component,  OnInit, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import {TodoFormComponent} from "./components/todo-form/todo-form.component"

@Component({
  standalone: true,
  imports: [ CommonModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TodoFormComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  
})
export class AppComponent { //implements OnInit
  title = 'todo';
}
