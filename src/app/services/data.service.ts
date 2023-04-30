import { Injectable } from '@angular/core';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: any[] = [];

  getItems(): Token[] {
    return this.items;
  }

  addItem(item: Token): void {
    this.items.push(item);
  }

  filterItems(searchText: string, selectedChain: string, selectedSupply: string): Token[] {
    return this.items.filter(item => {
      const chainMatch = !selectedChain || item.chain === selectedChain;
      const supplyMatch = !selectedSupply || item.isEnabled.toString() === selectedSupply;
      const searchMatch = !searchText || item.token.toLowerCase().includes(searchText.toLowerCase());
      return chainMatch && supplyMatch && searchMatch;
    });
  }
}
