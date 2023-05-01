import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Token } from 'src/app/models/token';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  items: Token[] = [];
  selectedChain = '';
  selectedSupply = '';
  searchText = '';
  chains: string[] = ['Ethereum', 'Binance Smart Chain'];
  supplyOptions: {
    value: string, label: string
  }[] = [
      { value: '', label: 'Filter by supply' },
      { value: 'true', label: 'Enabled' },
      { value: 'false', label: 'Disabled' }
    ];

  @Output() addToken = new EventEmitter<void>();

  constructor(private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.items = this.dataService.getItems();
  }

  updateItems(): void {
    this.items = this.dataService.filterItems(this.searchText, this.selectedChain, this.selectedSupply);
  }

  onDuplicate(id: number): void {
    const index = this.items.findIndex(obj => obj.id === id);
    this.dataService.addItem(this.items[index]);
    this.toastr.success(`Token copied successfully!`, 'Success');
  }

  onAddToken(): void {
    this.addToken.emit();
  }
}
