import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  symbol: string = 'MSFT'; // Default stock symbol
  stockData: any = null; 
  timeSeries: any[] = [];
  metaData: any = {};
  isLoading: boolean = false; 
  
  constructor(private stockService: StockService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchStockData(this.symbol);
  }

  // Fetch stock data for the selected symbol
  async fetchStockData(symbol: string): Promise<void> {
    this.isLoading = true;
    try {
      // Fetch data from the service
      this.stockData = await this.stockService.getStockData(symbol);
      console.log('Fetched stock data:', this.stockData); 

      this.metaData = {
        symbol: this.stockData['Meta Data']['2. Symbol'],
        lastRefreshed: this.stockData['Meta Data']['3. Last Refreshed'],
        timeZone: this.stockData['Meta Data']['5. Time Zone'],
      };
  

      this.timeSeries = this.formatTimeSeries(this.stockData['Time Series (Daily)'] || {});
  

      this.cdr.detectChanges(); 
      console.log('Meta Data:', this.metaData);
      console.log('Meta Data Keys:', Object.keys(this.metaData)); 
      Object.keys(this.metaData).forEach((key) => {
        console.log(`Meta Data [${key}]:`, this.metaData[key]); 
      });
  
      console.log('Formatted Time Series:', this.timeSeries);
    } catch (error) {
      console.error('Failed to fetch stock data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  formatTimeSeries(timeSeries: any): any[] {
    if (!timeSeries || typeof timeSeries !== 'object') {
      console.error('Invalid or missing timeSeries:', timeSeries);
      return [];
    }

    return Object.keys(timeSeries).map((date) => ({
      date,
      ...timeSeries[date],
    }));
  }

  onSymbolChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.symbol = target.value; // Update the selected symbol
    this.fetchStockData(this.symbol); // Fetch data for the new symbol
  }
}
