import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  dashboard = 'assets/DashboardImg/dashboard.svg';
  PurchaseRequest = 'assets/DashboardImg/PurchaseReq.svg';  
  ItemDetalis = 'assets/DashboardImg/ItemDetails.svg';  
  logout = 'assets/DashboardImg/logout.svg';
  forcelogo = 'assets/DashboardImg/force-logo.png';  
  
}
