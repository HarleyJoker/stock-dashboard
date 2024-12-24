import { RouterModule,Routes } from '@angular/router';
import { DashboardComponent } from './components/stock-dashboard/stock-dashboard.component';
import { BrowserModule } from '@angular/platform-browser'; 
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
];
