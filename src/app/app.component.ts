import { Component } from '@angular/core';
import { ExpandCollapseComponent } from './components/expand-collapse/expand-collapse.component';
import { TypeAheadComponent } from './components/type-ahead/type-ahead.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ExpandCollapseComponent, TypeAheadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'enoc';
}
