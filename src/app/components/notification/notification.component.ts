import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  notifications = [
    { id: 1, message: 'Your order has been shipped.' },
    { id: 2, message: 'New comment on your post.' },
    { id: 3, message: 'You have a new follower.' },
    { id: 4, message: 'You have a new follower.' },
    { id: 5, message: 'You have a new follower.' },
    { id: 6, message: 'You have a new follower.' },
  ];
  isDropdownOpen = false;

  openDropdown(): void {
    this.isDropdownOpen = true;
  }
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
  handleMore(): void {
    console.log('More details ');
    // Add logic to navigate to details or take appropriate action
  }
}
