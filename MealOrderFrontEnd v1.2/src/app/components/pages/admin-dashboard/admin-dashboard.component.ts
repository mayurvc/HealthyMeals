import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  activeTab: string = 'reviews'; // Default tab

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit(){}

}
