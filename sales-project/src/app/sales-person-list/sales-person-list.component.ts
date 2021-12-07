import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  salesPersonList : SalesPerson[] = [
    new SalesPerson("Anup", "Kumar", "anup@kumar.com", 50000),
    new SalesPerson("ower", "maiden", "aower@kumar.com", 40000),
    new SalesPerson("mike", "smith", "mike@smith.com", 90000)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
