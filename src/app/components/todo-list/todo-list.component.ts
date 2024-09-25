import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoFacadeService} from 'src/app/services/todo-facade/todo-facade.service'
import { TuiAccordionModule } from '@taiga-ui/kit';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import {TuiChipModule} from '@taiga-ui/experimental';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TuiAccordionModule, TodoFormComponent, TuiChipModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  private readonly todoFacadeService = inject(TodoFacadeService)
  readonly todo$ = this.todoFacadeService.get()
}
