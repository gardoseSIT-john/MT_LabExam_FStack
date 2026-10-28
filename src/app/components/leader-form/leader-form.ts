import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GymLeaderService } from '../Service/gym-leader-service';

@Component({
  selector: 'app-leader-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './leader-form.html',
  styleUrl: './leader-form.css'
})
export class LeaderFormComponent {
  private fb = inject(FormBuilder);
  private leaderService = inject(GymLeaderService);

  leaderForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    region: ['Kanto', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['', Validators.required],
    aceLevel: [1, [
      Validators.required,
      Validators.min(1),
      Validators.max(100)
    ]],
    motto: ['', Validators.maxLength(150)]
  });

  onSubmit() {
    if (this.leaderForm.invalid) {
      this.leaderForm.markAllAsTouched();
      return;
    }

    this.leaderService.addLeader(this.leaderForm.getRawValue())
      .subscribe({
        next: () => {
          this.leaderForm.reset({
            name: '',
            region: 'Kanto',
            town: '',
            badge: '',
            specialty: '',
            aceLevel: 1,
            motto: ''
          });

          this.leaderService.fetchLeaders();
        },
        error: (err) => {
          console.error('Failed to add leader:', err);
        }
      });
  }
}