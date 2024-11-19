import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { dataset } from '../../data/states';

interface FilteredData {
  startDate: string
  endDate: string
  category: string
  tags: string[]
}

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
  filters:FilteredData = {
    startDate: '',
    endDate: '',
    category: '',
    tags: []
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


  multiSearch(): void {
    const criteria = this.filters;
  
    // Filter the dataset based on all conditions
    this.tableData = dataset.filter(item => {
      // Category match
      const categoryMatch = !criteria.category || 
        item.category.toLowerCase() === criteria.category.toLowerCase();
  
      // Tags match
      const tagsMatch = !criteria.tags.length || 
        criteria.tags.every((tag: string) => item.tags.some((t: string) => t.toLowerCase() === tag.toLowerCase()));
  
      // Start Date match
      const startDateMatch = !criteria.startDate || 
        new Date(item.startDate) >= new Date(criteria.startDate);
  
      // End Date match
      const endDateMatch = !criteria.endDate || 
        new Date(item.endDate) <= new Date(criteria.endDate);
  
      // All conditions must match
      return categoryMatch && tagsMatch && startDateMatch && endDateMatch;
    });
  }
  
}