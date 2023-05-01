import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Token } from 'src/app/models/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input() items: Token[] = [];
  @Output() addToken = new EventEmitter<void>();

  constructor(private dataService: DataService, private toastr: ToastrService) { }

  public onAddToken(): void {
    this.addToken.emit();
  }

  public onDuplicate(item: Token): void {
    this.dataService.addItem(item);
    this.toastr.success(`Token copied successfully!`, 'Success');
  }
}