import { Component } from '@angular/core';
import { informationLinkData } from '../../data/states';

@Component({
  selector: 'app-information-links',
  standalone: true,
  imports: [],
  templateUrl: './information-links.component.html',
  styleUrl: './information-links.component.scss'
})
export class InformationLinksComponent {

  infoData = informationLinkData

  navigate() {
    alert("Navigating..")
  }
}
