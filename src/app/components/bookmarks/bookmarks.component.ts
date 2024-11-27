import { Component, inject, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent {

  private readonly modalService = inject(NgbModal);

  isBookmarkEdit = false;
  isFolderName = false;

  showBookmarkMenu(content: TemplateRef<any>){
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  editBookmark(){
    this.isBookmarkEdit = true;
  }

}
