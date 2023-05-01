import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FiltersModel, Token } from 'src/app/models/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() addToken = new EventEmitter<void>();

  public items: Token[] = [];
  public model: FiltersModel = { selectedChain: '', selectedSupply: '', searchText: '' };
  public chains: string[] = ['Ethereum', 'Binance Smart Chain'];
  public supplyOptions: {
    value: string, label: string
  }[] = [
      { value: '', label: 'Filter by supply' },
      { value: 'true', label: 'Enabled' },
      { value: 'false', label: 'Disabled' }
    ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.items = this.dataService.getItems();
  }

  public updateItems(): void {
    const { searchText, selectedChain, selectedSupply } = this.model;
    this.items = this.dataService.filterItems(searchText, selectedChain, selectedSupply);
  }

  public onAddToken = () => {
    this.addToken.emit();
  }
}
