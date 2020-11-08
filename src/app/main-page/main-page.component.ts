import { BudgetItem } from './../shared/models/budget-item.model';
import { Component, OnInit } from '@angular/core';
import { UpdateEdittedEvent } from '../budget-item-list/budget-item-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  budgetItems: BudgetItem[] = new Array<BudgetItem>();
  totalBudget: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  addItem(newItem: BudgetItem) {
    this.budgetItems.push(newItem);
    this.totalBudget += newItem.amount;
  }

  deleteItem(item: BudgetItem) {
    let index = this.budgetItems.indexOf(item);
    this.budgetItems.splice(index, 1);
    this.totalBudget -= item.amount;
  }

  updateEditted(updateEdittedEvent: UpdateEdittedEvent) {
    // replace item with updated item
    this.budgetItems[this.budgetItems.indexOf(updateEdittedEvent.old)] = updateEdittedEvent.new;
    this.totalBudget -= updateEdittedEvent.old.amount;
    this.totalBudget += updateEdittedEvent.new.amount;
  }

}
