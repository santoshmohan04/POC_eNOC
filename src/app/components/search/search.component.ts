import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { dataset } from '../../data/states'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgbDropdownModule, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  searchQuery = '';
  showAdvanced = false;
  tableData: any = []

  // Advanced search filters
  filters = {
    startDate: '',
    endDate: '',
    category: '',
    tags: [] as string[]
  };

  // Data for dropdowns
  categories = ['Technology', 'Health', 'Finance', 'Education'];
  tags = ['Angular', 'React', 'Vue', 'Svelte'];
  selectedTags: string[] = [];

  toggleAdvancedSearch(): void {
    this.showAdvanced = !this.showAdvanced;
  }

  toggleTag(tag: string): void {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
    this.filters.tags = this.selectedTags;
  }

  onSearch(): void {
    this.tableData = this.searchQuery.trim() ? dataset.filter(item => item.category.toLocaleLowerCase().trim().includes( this.searchQuery.trim() )) : []

  }

}
