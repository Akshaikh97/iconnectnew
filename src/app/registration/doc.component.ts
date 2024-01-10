import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../shared/services/api-service.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.css'
})
export class DocComponent {
  docForm: FormGroup;
  panImage: any;

  constructor(private fb: FormBuilder,  private apiService: ApiServiceService){
    this.docForm = this.fb.group({});
  }

  handlePanImage(event: any): void {
    const file = event.target.files[0];
    this.panImage = file;
    // Perform any additional logic if needed
  }
}
