import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  searchKey = '';

  constructor(private readonly searchService: SearchService) {}

  onSearch(event: Event): void {
    event.preventDefault();
    const term = this.searchKey.trim();

    if (term) {
      this.searchService.performSearch(term);
    } else {
      this.searchService.clearHighlights();
    }
  }
}
