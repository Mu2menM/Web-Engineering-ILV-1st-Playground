import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment-model';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent {
  isVisible = false;
  name = '';
  comment = '';

  comments: Comment[] = [
    {
      name: 'Bob Fossil',
      text: 'Oh I am so glad you taught me all about the big brown angry guys...',
    },
  ];

  toggleComments(): void {
    this.isVisible = !this.isVisible;
  }

  submitComment(event: Event): void {
    event.preventDefault();

    const nameTrimmed = this.name.trim();
    const commentTrimmed = this.comment.trim();

    if (!nameTrimmed || !commentTrimmed) {
      alert('Please enter both name and comment');
      return;
    }

    this.comments.push({
      name: nameTrimmed,
      text: commentTrimmed,
    });

    this.name = '';
    this.comment = '';
  }
}
