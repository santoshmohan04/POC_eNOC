import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCollapseComponent } from './expand-collapse.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

describe('ExpandCollapseComponent', () => {
  let component: ExpandCollapseComponent;
  let fixture: ComponentFixture<ExpandCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbAccordionModule, ExpandCollapseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandCollapseComponent);
    component = fixture.componentInstance;
    component.items = [
      { name: 'Item 1', data: 'Data 1' },
      { name: 'Item 2', data: 'Data 2' },
      { name: 'Item 3', data: 'Data 3' }
    ]; // Add this line to initialize items with 3 elements
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should have items defined', () => {
  expect(component.items).toBeDefined();
});

it('should have items with length greater than 0', () => {
  expect(component.items.length).toBeGreaterThan(0);
});

it('should render accordion items', () => {
  const compiled = fixture.nativeElement;
  const accordionItems = compiled.querySelectorAll('[ngbAccordionItem]');
  expect(accordionItems.length).toBe(component.items.length);
});

});
