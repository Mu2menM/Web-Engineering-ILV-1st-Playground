import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { SecondaryComponent } from './components/secondary/secondary.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { BearListComponent } from './components/bear-list/bear-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    SecondaryComponent,
    CommentSectionComponent,
    BearListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    console.log('Wildlife Website Loaded — Search & Comments Ready!');
  }
}
