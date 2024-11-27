import { Component, ViewEncapsulation } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-indicator',
  standalone: true,
  imports: [NgbProgressbarModule, CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './status-indicator.component.html',
  styleUrl: './status-indicator.component.scss'
})
export class StatusIndicatorComponent {
  progressdetails = [{step:1, value: 14.8}, {step:2, value: 28.56}, {step:3, value: 14.8}, {step:4, value: 14.8}, {step:5, value: 14.8}, {step:6, value: 14.8}, {step:7, value: 14.8}]
  progressValue = 50;
  get progressColor(): string {
    if (this.progressValue < 30) {
      return '#ff4d4d'; // Light red
    } else if (this.progressValue < 70) {
      return '#ffcc00'; // Yellow
    } else {
      return '#4caf50'; // Green
    }
  }

  getProgressBarClass(value: number): string {
    if (value < 30) {
      return 'bg-danger-custom';
    } else if (value < 70) {
      return 'bg-warning-custom';
    } else {
      return 'bg-success-custom';
    }
  }
  
}
