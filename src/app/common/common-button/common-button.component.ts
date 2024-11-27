import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss'
})
export class CommonButtonComponent {
  @Input() title: string = ''
  @Input() btnClass: string = ''
  @Output() onBtnClick = new EventEmitter<any>();

  onSubmit() {
    this.onBtnClick.emit("Hello From Child")
  }
}
