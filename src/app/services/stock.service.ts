import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private baseUrl = 'http://localhost:7264/api/Stock'; 

  constructor() {}

  // Fetch stock data by symbol
  async getStockData(symbol: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }
}
