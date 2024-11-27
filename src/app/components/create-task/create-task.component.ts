import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-create-task',
  standalone: false,
  
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Pending', Validators.required],
    });
  }
  createTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = { ...this.taskForm.value, id: Date.now().toString()};
      this.taskService.createTask(newTask).subscribe(() => {
        alert('Task created successfully!');
        this.router.navigate(['/']);
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}

 