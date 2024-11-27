import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-alert.component.html',
  styleUrl: './common-alert.component.scss'
})
export class CommonAlertComponent {
  @Input() title: string = ''
  @Input() content: string = ''
  @Input() alertType: string = ''

}
