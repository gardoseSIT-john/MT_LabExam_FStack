
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GymLeaderService } from '../Service/gym-leader-service';

@Component({
  selector: 'app-leader-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './leader-form.html',
  styleUrl: './leader-form.css'
})
export class LeaderFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private leaderService = inject(GymLeaderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  leaderId: string | null = null;
  isEditMode = false;
  errorMessage = '';

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

  ngOnInit() {
    this.leaderId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.leaderId !== null;

    if (this.leaderId) {
      this.leaderService.getLeader(this.leaderId).subscribe({
        next: (leader) => {
          this.leaderForm.patchValue({
            name: leader.name,
            region: leader.region,
            town: leader.town,
            badge: leader.badge,
            specialty: leader.specialty,
            aceLevel: leader.aceLevel,
            motto: leader.motto ?? ''
          });
        },
        error: (err) => {
          console.error('Failed to load leader:', err);
          this.errorMessage = 'Could not load this Gym Leader.';
        }
      });
    }
  }

  onSubmit() {
    if (this.leaderForm.invalid) {
      this.leaderForm.markAllAsTouched();
      return;
    }

    const leaderData = this.leaderForm.getRawValue();

    if (this.leaderId) {
      this.leaderService
        .updateLeader(this.leaderId, leaderData)
        .subscribe({
          next: () => this.router.navigate(['/leaders']),
          error: (err) => {
            console.error('Failed to update leader:', err);
            this.errorMessage = 'Failed to update Gym Leader.';
          }
        });
    } else {
      this.leaderService.addLeader(leaderData).subscribe({
        next: () => this.router.navigate(['/leaders']),
        error: (err) => {
          console.error('Failed to add leader:', err);
          this.errorMessage = 'Failed to add Gym Leader.';
        }
      });
    }
  }
}
