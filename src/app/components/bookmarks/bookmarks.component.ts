import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface CratedFolder {
  value: string,
  name: string
}

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent {

  private readonly modalService = inject(NgbModal);

  isBookmarkEdit = true;
  isFolderName = false;
  cratedFolder: CratedFolder [] = []
  selectedValue = signal<string>('All')
  inputFolder: string = '';

  constructor(){
    this.cratedFolder = [
      { value:'All', name:'All' },
      { value:'Folder1', name:'Folder 1' },
      { value:'Folder1', name:'Folder 2' },
      { value:'Folder1', name:'Folder 3' },
    ]
  }

  showBookmarkMenu(content: TemplateRef<any>){
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  editBookmark(){
    this.isBookmarkEdit = true;
  }

  onChangeSelector(folder: Event){
    let eventTarget = folder.target as HTMLSelectElement
    this.selectedValue.update(() => eventTarget.value)
  }

  cratedFolderChanges(folder:any){
     this.inputFolder = folder
  }

  doneClickHandler(){
    if( this.inputFolder?.trim() !== '' ){
      const index = this.cratedFolder.findIndex(
        item => item.name.trim().toLocaleLowerCase() === this.inputFolder?.trim().toLocaleLowerCase()
      );
      if (index !== -1) {
        alert( "folder already exist" )
        return
      } else {
        this.cratedFolder.push( { value:this.inputFolder?.toLocaleLowerCase(), name: this.inputFolder } )
        this.inputFolder = ''
        this.isBookmarkEdit = false
      }
    } else if( this.selectedValue().trim() !== 'all' ||  this.selectedValue().trim() !== '' ) {
      this.isBookmarkEdit = false
    }
  }

}
