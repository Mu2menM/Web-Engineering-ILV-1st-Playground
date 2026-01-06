import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BearService } from '../../services/bear.service';
import { Bear } from '../../models/bear.model';

@Component({
  selector: 'app-bear-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bear-list.component.html',
  styleUrls: ['./bear-list.component.css'],
})
export class BearListComponent implements OnInit {
  bears: Bear[] = [];
  loading = true;
  error = false;

  constructor(private readonly bearService: BearService) {}

  ngOnInit(): void {
    this.loading = true;
    this.bearService
      .getBears()
      .then((bears) => {
        this.bears = bears;
        this.loading = false;
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
      });
  }
}
