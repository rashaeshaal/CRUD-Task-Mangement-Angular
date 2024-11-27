import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit-task',
  standalone: false,
  
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.taskId = 0;
  }

  
  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(this.taskId).subscribe((task) => {
      this.taskForm.patchValue(task);
    });
  }

  updateTask(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = { ...this.taskForm.value, id: this.taskId };
      this.taskService.updateTask(this.taskId, updatedTask).subscribe(() => {
        alert('Task updated successfully!');
        this.router.navigate(['/']);
      });
    }
  }
}