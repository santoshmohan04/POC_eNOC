import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAheadComponent } from './type-ahead.component';

describe('TypeAheadComponent', () => {
  let component: TypeAheadComponent;
  let fixture: ComponentFixture<TypeAheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeAheadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeAheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
