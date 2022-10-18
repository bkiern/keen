import { Component, Host, h, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'keen-stock-finder',
  styleUrl: 'keen-stock-finder.css',
  shadow: true,
})
export class KeenStockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { symbol: string; name: string; region: string }[] = [];
  @State() isLoading: boolean = false;

  @Event({ bubbles: true, composed: true }) keenSymbolSelected: EventEmitter<string>;

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    const key = 'UD1CKAQT2QNVJJBG';
    const value = this.stockNameInput.value;
    const endpoint = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${key}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      this.searchResults = data.bestMatches.map((match: any) => {
        return { symbol: match['1. symbol'], name: match['2. name'], region: match['4. region'] };
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  onSelectSymbol(symbol: string) {
    this.keenSymbolSelected.emit(symbol);
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input id="stock-query" ref={el => (this.stockNameInput = el)} />
          <button>Find</button>
        </form>
        {this.isLoading && <keen-spinner />}
        <ul>
          {this.searchResults.map(({ name, symbol, region }) => (
            <li key={symbol} onClick={this.onSelectSymbol.bind(this, symbol)}>
              <p>
                <strong>{symbol}</strong> - {region}
              </p>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
