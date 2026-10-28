import { Component,inject,OnInit } from '@angular/core';
import { GymLeaderService } from '../Service/gym-leader-service';
import { RouterLink } from '@angular/router';



@Component({
  imports: [RouterLink],
  standalone:true,
  selector: 'app-leader-list',
  styleUrl: './leader-list.css',
  templateUrl: './leader-list.html',
})
export class LeaderList implements OnInit{
  leaderService = inject(GymLeaderService)


  ngOnInit(): void {
    this.leaderService.fetchLeaders();
  }
}
