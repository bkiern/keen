import { Component, Host, h, State, Element, Prop, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'keen-stock-price',
  styleUrl: 'keen-stock-price.css',
  shadow: true,
})
export class KeenStockPrice {
  stockInput: HTMLInputElement;

  @Element() el: HTMLElement;
  @State() price: number = 0;
  @State() symbol: string = '';
  @State() errorMsg: string = '';
  @State() isLoading: boolean = false;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string = '';

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.isLoading = true;
      this.errorMsg = '';
      this.price = 0;
      this.symbol = newValue;
      this.fetchStockPrice(newValue);
    }
  }

  componentWillLoad() {
    console.log('componentWillLoad');
    if (this.stockSymbol) {
      this.symbol = this.stockSymbol;
    }
  }

  componentDidLoad() {
    console.log('componentDidLoad');
    if (this.stockSymbol) {
      this.symbol = this.stockSymbol;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  @Listen('keenSymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    console.log('stock symbol selected: ' + event.detail);
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  private async onSubmit(event: Event) {
    event.preventDefault();
    // const symbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    this.stockSymbol = this.stockInput.value;
    // await this.fetchStockPrice(symbol);
  }

  private async fetchStockPrice(symbol: string) {
    const key = 'UD1CKAQT2QNVJJBG';
    const endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      const price = +data['Global Quote']['05. price'];
      if (!price) throw new Error(`No result found for ${this.symbol}.`);
      this.price = price;
    } catch (error) {
      console.log(error);

      if (error.message) {
        this.errorMsg = error.message;
        return;
      }

      this.errorMsg = 'An unkown error has occured.';
    } finally {
      this.isLoading = false;
    }
  }

  private onInput(event: Event) {
    this.symbol = (event.target as HTMLInputElement).value.toUpperCase();
  }

  render() {
    let content = null;
    if (this.isLoading) content = <keen-spinner />;
    if (!this.symbol) content = <p>Please enter a symbol.</p>;
    if (this.errorMsg) content = <p>{this.errorMsg}</p>;
    if (this.price) content = <p>Price: ${this.price}</p>;

    return (
      <Host class={{ error: !!this.errorMsg }}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input id="stock-symbol" ref={el => (this.stockInput = el)} value={this.symbol} onInput={this.onInput.bind(this)} />
          <button disabled={!this.symbol || this.isLoading}>Get Price</button>
        </form>
        <div>{content}</div>
      </Host>
    );
  }
}
