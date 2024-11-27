import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationLinksComponent } from './information-links.component';

describe('InformationLinksComponent', () => {
  let component: InformationLinksComponent;
  let fixture: ComponentFixture<InformationLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
