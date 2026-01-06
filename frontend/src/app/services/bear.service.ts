import { Injectable } from '@angular/core';
import { Bear } from '../models/bear.model';

@Injectable({
  providedIn: 'root',
})
export class BearService {
  // We now point to OUR backend, not Wikipedia directly
  private readonly API_URL = 'http://localhost:3001/api/bears';

  constructor() {}

  async getBears(): Promise<Bear[]> {
    const response = await fetch(this.API_URL);

    if (!response.ok) {
      throw new Error(
        `Backend API error: ${response.status} ${response.statusText}`
      );
    }

    // The backend now returns the clean array of Bears directly
    return response.json() as Promise<Bear[]>;
  }
}
