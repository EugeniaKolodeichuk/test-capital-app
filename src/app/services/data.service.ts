import { Injectable } from '@angular/core';
import { Token } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: Token[] = [];

  public getItems(): Token[] {
    return this.items;
  }

  public addItem(item: Token): void {
    this.items.push(item);
  }

  public filterItems(searchText: string, selectedChain: string, selectedSupply: string): Token[] {
    return this.items.filter(item => {
      const chainMatch = !selectedChain || item.chain === selectedChain;
      const supplyMatch = !selectedSupply || item.isEnabled.toString() === selectedSupply;
      const searchMatch = !searchText || item.token.toLowerCase().includes(searchText.toLowerCase());
      return chainMatch && supplyMatch && searchMatch;
    });
  }
}
