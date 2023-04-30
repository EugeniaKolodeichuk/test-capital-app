import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  supplyOptions: any[] = [
    { value: '', label: 'Filter by supply' },
    { value: 'true', label: 'Enabled' },
    { value: 'false', label: 'Disabled' }
  ];

  @Output() addToken = new EventEmitter<void>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.items = this.dataService.getItems();
  }

  updateItems(): void {
    this.items = this.dataService.filterItems(this.searchText, this.selectedChain, this.selectedSupply);
  }

  onDuplicate(id: number): void {
    const index = this.items.findIndex(obj => obj.id === id);
    this.dataService.addItem(this.items[index]);
  }

  onAddToken(): void {
    this.addToken.emit();
  }
}
