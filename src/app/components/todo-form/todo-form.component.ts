import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFacadeService} from 'src/app/services/todo-facade/todo-facade.service'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule,TuiSelectModule,  TuiCheckboxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { Todo } from 'src/app/models/todo.interface';
import { NewTodo } from 'src/app/models/new-todo.interface';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';

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
  @Input() set isCreateForm(value:boolean){
    if(!value) {
      this.formTitle = 'Редактировать задачу'
    }
  };

  @Input() set todo(value: Todo){
    this.form.reset({
      userId: value.userId,
      title: value.title,
      completed: value.completed ? 'Готово' : 'Не выполнена',
      id: value.id,
    })
  };

  private readonly todoFacadeService = inject(TodoFacadeService);
  private readonly destroy$ = inject(TuiDestroyService)

  readonly completedOptions = ['Готово', 'Не выполнена']
  readonly loading = signal(false);

  readonly form = new FormGroup({
    userId: new FormControl<number>( 1, {
      nonNullable: true,
      validators: Validators.required
    }),
    id: new FormControl<number | null>( null, {
      nonNullable: true,
      validators: Validators.required
    }),
    title: new FormControl('', Validators.required),
    completed: new FormControl< 'Готово' | 'Не выполнена' | null >(null, {
      nonNullable: true
    }),
  });

  formTitle = 'Создать задачу';

  submit() {
    if(this.form.valid){

      this.form.disable();
      this.loading.set(true)
      
      if(this.formTitle === 'Создать задачу'){
          const formValue = {
            userId: this.form.value.userId,
            title: this.form.value.title,
            completed: this.form.value.completed === 'Готово',
           } as NewTodo;
          
          this.todoFacadeService
          .create(formValue)
          .pipe(takeUntil(this.destroy$))
          .subscribe(res => {
            console.log(res)
            this.loading.set(false)

            this.form.reset();
            this.form.enable();
          })
      } else {
        const formValue = {
          userId: this.form.value.userId,
          title: this.form.value.title,
          id: this.form.value.id,
          completed: this.form.value.completed === 'Готово',
         } as Todo;
        
         this.todoFacadeService
          .edit(formValue)
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
}
