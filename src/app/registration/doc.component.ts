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

  constructor(private fb: FormBuilder,  private apiService: ApiServiceService){
    this.docForm = this.fb.group({});
  }
}
