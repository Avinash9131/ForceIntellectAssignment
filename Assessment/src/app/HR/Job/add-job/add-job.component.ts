import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddJobService } from 'src/app/services/add-job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  companyname = ["Force Intellect"];
  IndentType = ["Capital", "Revenue"];
  department = ["Electrical", "Mechanical"];
  ChargeType = ["Chargeable", "Non-Chargeable"];

  addJob: any = {
    documentNumber: '',
    companyName: '',
    indentType: '',
    department: '',
    chargeType: '',
    requestedBy: '',
    indentTag: '',
    remarks: '',
    reserved: false,
    date: ''
  };

  requestedByOptions = ['User1', 'User2', 'User3'];
  indentTagOptions = ['Tag1', 'Tag2', 'Tag3'];

  constructor(private addJobService: AddJobService, private snack: MatSnackBar) { }

  ngOnInit(): void { }

  async saveJob() {
    try {
      const formattedData = {
        companyName: this.addJob.companyName,
        department: this.addJob.department,
        indentType: this.addJob.indentType,
        chargeType: this.addJob.chargeType,
        date: this.addJob.date,
        requestedBy: this.addJob.requestedBy,
        indentTag: this.addJob.indentTag,
        isReserved: this.addJob.reserved.toString(),  // Ensure it is sent as a string
        remark: this.addJob.remarks,
        documentNumber: this.addJob.documentNumber
      };

      console.log('Submitting form with data:', formattedData); // Log form data

      const data = await this.addJobService.addJob(formattedData).toPromise();
      this.snack.open("Submitted Successfully !!", '', {
        duration: 3000, verticalPosition: 'top'
      });

      // this.router.navigateByUrl(`/api/postPurchase`);
    } catch (error) {
      console.error('Error submitting form:', error); // Log error
      this.snack.open("Something Went Wrong !!", '', {
        duration: 3000, verticalPosition: 'top'
      });
    }
  }

  
}
