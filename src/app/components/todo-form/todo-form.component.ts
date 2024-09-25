import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFacadeService} from 'src/app/services/todo-facade/todo-facade.service'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule,TuiSelectModule,  TuiCheckboxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { NewTodo } from 'src/app/models/new-todo.interface';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';

//import {TuiInputModule} from '@taiga-ui/legacy';
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiInputModule, TuiSelectModule, TuiDataListWrapperModule, TuiButtonModule , TuiCheckboxModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})

export class TodoFormComponent {
  private readonly todoFacadeService = inject(TodoFacadeService);
  private readonly destroy$ = inject(TuiDestroyService)
  readonly completedOptions = ['Выполнена', 'Не выполнена']
  readonly loading = signal(false);

  readonly form = new FormGroup({
    userId: new FormControl<number>( 1, {
      nonNullable: true,
      validators: Validators.required
    }),
    title: new FormControl('', Validators.required),
    completed: new FormControl< 'Выполнена' | 'Не выполнена' | null >(null, {
      nonNullable: true
    }),
  });

  submit() {
    if(this.form.valid){
      const formValue = {...this.form.value, completed: this.form.value.completed === 'Выполнена'} as NewTodo;
      this.form.disable();
      this.loading.set(true)

      this.todoFacadeService
      .create(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        console.log(res)
        this.loading.set(false)

        this.form.reset();
        this.form.enable();
        
      })
    }
  }
}
