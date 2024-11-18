import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { accordianitems } from '../../data/states'

@Component({
  selector: 'app-expand-collapse',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './expand-collapse.component.html',
  styleUrl: './expand-collapse.component.scss'
})
export class ExpandCollapseComponent {

  items = accordianitems

}
