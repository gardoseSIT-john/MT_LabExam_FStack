import { Service,inject,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GymLeader } from '../gym-leader';

@Service()
export class GymLeaderService {
    
    private http = inject(HttpClient);

    private apiURL = "http://localhost:3000/api/leaders";

    leaders = signal<GymLeader[]>([]);

    fetchLeaders(){
        this.http.get<GymLeader[]>(this.apiURL).subscribe({
            next: (data) =>{
                this.leaders.set(data);
            },
            error:(err) =>{
                console.error('Failed to fetch leaders: ', err);
            }
        });
    }

    addLeader(leader:GymLeader){
        return this.http.post<GymLeader>(this.apiURL,leader);
    }



    
}
