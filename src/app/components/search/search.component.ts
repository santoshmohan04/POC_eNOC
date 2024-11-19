import { CommonModule } from '@angular/common';
import { Component, effect, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { dataset } from '../../data/states';

interface FilteredData {
  startDate: string;
  endDate: string;
  category: string;
  tags: string[];
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgbDropdownModule, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchQuery = signal<string>('');
  showAdvanced = false;
  tableData = signal<any[]>([]);
  

  @ViewChild('tablelist') private tabletemplate!:TemplateRef<string>;
  @ViewChild('nodata') private nodatatemplate!:TemplateRef<string>;

  displaytemplate = signal<TemplateRef<string>>(this.nodatatemplate)

  // Advanced search filters
  filters = signal<FilteredData>({
    startDate: '',
    endDate: '',
    category: '',
    tags: [],
  });

  // Data for dropdowns
  categories = ['Technology', 'Health', 'Finance', 'Education'];
  tags = ['Angular', 'React', 'Vue', 'Svelte'];
  selectedTags: string[] = [];

  constructor() {
    effect(() => {
      const criteria = this.filters();
      const searchQuery = this.searchQuery().toLowerCase().trim();
      // Check if all filters and searchQuery are empty
      const isFiltersEmpty =
        !searchQuery &&
        !criteria.category &&
        !criteria.tags.length &&
        !criteria.startDate &&
        !criteria.endDate;

      // Clear tableData if all filters and searchQuery are empty
      if (isFiltersEmpty) {
        this.tableData.set([]);
        this.displaytemplate.set(this.nodatatemplate)
        return;
      }

      if(this.tableData().length > 0){
        this.displaytemplate.set(this.tabletemplate);
      }
    });
  }

  toggleAdvancedSearch(): void {
    this.showAdvanced = !this.showAdvanced;
  }

  toggleTag(tag: string): void {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
    this.filters.update((val) => ({
      ...val, // Spread the current values
      tags: this.selectedTags, // Update the `tags` property
    }));
  }

  clearFilter(): void {
    this.filters.set({
      startDate: '',
      endDate: '',
      category: '',
      tags: [],
    });
    this.selectedTags = [];
  }

  multiSearch(): void {
    const criteria = this.filters();
    const searchQuery = this.searchQuery().toLowerCase().trim();

    this.tableData.set(dataset.filter((item) => {
      const searchQueryMatch =
        !searchQuery ||
        item.category.toLowerCase().includes(searchQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

      const categoryMatch =
        !criteria.category ||
        item.category.toLowerCase() === criteria.category.toLowerCase();

      const tagsMatch =
        !criteria.tags.length ||
        criteria.tags.every((tag: string) =>
          item.tags.some((t: string) => t.toLowerCase() === tag.toLowerCase())
        );

      const startDateMatch =
        !criteria.startDate ||
        new Date(item.startDate) >= new Date(criteria.startDate);

      const endDateMatch =
        !criteria.endDate ||
        new Date(item.endDate) <= new Date(criteria.endDate);

      return (
        searchQueryMatch &&
        categoryMatch &&
        tagsMatch &&
        startDateMatch &&
        endDateMatch
      );
    }));
  }
}
