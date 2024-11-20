import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should toggle advanced search', () => {
  expect(component.showAdvanced).toBeFalse();
  component.toggleAdvancedSearch();
  expect(component.showAdvanced).toBeTrue();
  component.toggleAdvancedSearch();
  expect(component.showAdvanced).toBeFalse();
});

it('should toggle tags', () => {
  const tag = 'Angular';
  expect(component.selectedTags).not.toContain(tag);
  component.toggleTag(tag);
  expect(component.selectedTags).toContain(tag);
  component.toggleTag(tag);
  expect(component.selectedTags).not.toContain(tag);
});

it('should clear filters', () => {
  component.filters.set({
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    category: 'Technology',
    tags: ['Angular'],
  });
  component.selectedTags = ['Angular'];
  component.clearFilter();
  expect(component.filters()).toEqual({
    startDate: '',
    endDate: '',
    category: '',
    tags: [],
  });
  expect(component.selectedTags).toEqual([]);
});

it('should check if queries are empty', () => {
  component.filters.set({
    startDate: '',
    endDate: '',
    category: '',
    tags: [],
  });
  component.searchQuery.set('');
  expect(component.isEmptyQuerries()).toBeTrue();

  component.searchQuery.set('Angular');
  expect(component.isEmptyQuerries()).toBeFalse();
});

it('should perform multiSearch and set tableData', () => {
  component.filters.set({
    startDate: '',
    endDate: '',
    category: 'Technology',
    tags: ['Angular'],
  });
  component.searchQuery.set('Angular');
  component.multiSearch();
  expect(component.tableData().length).toBeGreaterThan(0);
});

it('should set no data template if no results found', () => {
  component.filters.set({
    startDate: '',
    endDate: '',
    category: 'NonExistentCategory',
    tags: [],
  });
  component.searchQuery.set('');
  component.multiSearch();
  expect(component.tableData().length).toBe(0);
  expect(component.displaytemplate()).toBe(component.nodatatemplate);
});

});
