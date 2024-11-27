import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status-indicator',
  standalone: true,
  imports: [CommonModule, NgbProgressbarModule],
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.scss'],
})
export class StatusIndicatorComponent {
  progressdetails = [
    { step: 1, value: 14.8 },
    { step: 2, value: 28.56 },
    { step: 3, value: 44.4 },
    { step: 4, value: 59.2 },
    { step: 5, value: 73.2 },
    { step: 6, value: 88 },
    { step: 7, value: 100 },
  ];

  currentStep = 7;


  getProgressBarColor(step: number): string {
    // Get the value for the current step
    const currentValue = this.progressdetails.find(item => item.step === this.currentStep)?.value || 0;

    // Get the value for the current step being iterated
    const stepValue = this.progressdetails.find(item => item.step === step)?.value || 0;

    // Determine the color based on the step value
    if (stepValue <= currentValue) {
      if (currentValue <= 44) {
        return '#9FE1BE';
      }
      else if (currentValue <= 59) {
        return '#00b154';
      }
      else if (currentValue <= 88) {
        return '#fdb62b';
      }
      else {
        return '#e51a1a';
      }
    } else {
      return '#e6ebf1'; // Default (inactive) color
    }
  }

}
