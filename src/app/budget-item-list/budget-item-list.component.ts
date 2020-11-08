import { EditItemModalComponent } from './../edit-item-modal/edit-item-modal.component';
import { BudgetItem } from './../shared/models/budget-item.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})

export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEdittedEvent> = new EventEmitter<UpdateEdittedEvent>();

  constructor(public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  onDeleteClick(budgetItem: BudgetItem) {
    this.delete.emit(budgetItem);
  }

  onCardClicked(item: BudgetItem){
    // show edit modal by using dialog 
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '780px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result) { // if result has value
          this.update.emit({
          old: item,
          new: result
        });
      }
    })
  }
}

export interface UpdateEdittedEvent {
  old: BudgetItem;
  new: BudgetItem;
}