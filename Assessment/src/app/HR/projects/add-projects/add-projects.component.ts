import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddProjectsService } from 'src/app/services/add-projects.service';

interface Item {
  itemName: string;
  itemCode: string;
  uom: number;
  description: string;
  make: string;
  quantity: number;
  rate: number;
  remark: string;
  amount: number;
  date: Date;
}



@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css'],
  providers: [DatePipe]
})
export class AddProjectsComponent {

  displayedColumns: string[] = ['sno', 'itemDetails', 'description', 'make', 'spacer', 'uom', 'quantity', 'rate', 'amount', 'date', 'remark', 'actions'];
  dataSource = new MatTableDataSource<Item>([]);
  itemNames: string[] = ['Item1', 'Item2', 'Item3'];
  itemCodes: string[] = ['Code1', 'Code2', 'Code3'];
  uoms: number[] = [1, 2.5, 3];
  makes: string[] = ['Make1', 'Make2', 'Make3'];
  netAmount: number = 0;
  

  constructor(private addProjectsService: AddProjectsService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.loadData();
    this.calculateNetAmount();
  }

  loadData(): void {
    const data = localStorage.getItem('tableData');
    if (data) {
      this.dataSource.data = JSON.parse(data);
    } else {
      this.dataSource.data = [
        { itemName: '', itemCode: '', uom: 0, description: '', make: '', quantity: 0, rate: 0, amount: 0, remark:'', date: new Date() }
      ];
    }
  }

  saveData(): void {
    localStorage.setItem('tableData', JSON.stringify(this.dataSource.data));
  }

  updateAmount(element: Item): void {
    element.amount = element.quantity * element.rate;
    this.calculateNetAmount();
    this.saveData();
  }

  calculateNetAmount(): void {
    this.netAmount = this.dataSource.data.reduce((sum, item) => sum + item.amount, 0);
  }

  addRow(): void {
    const newRow: Item = {
      itemName: '',
      itemCode: '',
      uom: 0,
      description: '',
      make: '',
      quantity: 0,
      rate: 0,
      amount: 0,
      remark:'',
      date: new Date()
    };
    this.dataSource.data = [...this.dataSource.data, newRow];
    this.saveData();
  }

  deleteRow(index: number): void {
    const data = this.dataSource.data;
    data.splice(index, 1);
    this.dataSource.data = data;
    this.calculateNetAmount();
    this.saveData();
  }

  async addJob(): Promise<void> {
    const jobData = this.dataSource.data.map(item => ({
      description: item.description,
      itemName: item.itemName,
      itemCode: item.itemCode,
      make: item.make,
      uom: item.uom,
      date: this.datePipe.transform(item.date, 'yyyy-MM-dd'),
      remark: item.remark,
      quantity: item.quantity,
      rate: item.rate,
      amount: item.amount
    }));
  
    console.log('Sending job data:', jobData);
  
    try {
      const response = await this.addProjectsService.addJob(jobData).toPromise();
      console.log('Job data saved successfully', response);
    } catch (error) {
      console.error('Error saving job data', error);
    }
  }
  
  
}