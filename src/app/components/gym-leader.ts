import { HttpClient } from '@angular/common/http';
import { Service,inject,signal } from '@angular/core';

export interface GymLeader {
  _id?: string;
  name: string;
  region: string;
  town: string;
  badge: string;
  specialty: string;
  aceLevel: number;
  motto: string;
}