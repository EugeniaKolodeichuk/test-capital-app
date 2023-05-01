export interface Token {
    company: string;
    token: string;
    symbol: string;
    supply: number;
    chain: string;
    isEnabled: boolean;
}

export interface FiltersModel {
    selectedChain: string;
    selectedSupply: string;
    searchText: string;
}