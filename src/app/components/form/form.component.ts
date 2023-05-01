import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<void>();

  public form!: FormGroup;
  public isSubmitted = false;
  public companyOptions: string[] = [
    'My company', 'First company', 'Second company', 'Third company'
  ];

  constructor(private fb: FormBuilder, private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      company: ['My company'],
      token: ['', Validators.required],
      symbol: ['', Validators.required],
      supply: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      chain: ['Ethereum'],
      isEnabled: [true]
    });
  }

  public onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {

      const item = {
        company: this.form.get('company')?.value,
        token: this.form.get('token')?.value,
        symbol: this.form.get('symbol')?.value,
        supply: this.form.get('supply')?.value,
        chain: this.form.get('chain')?.value,
        isEnabled: this.form.get('isEnabled')?.value
      };

      this.dataService.addItem(item);
      this.formSubmitted.emit();
      this.toastr.success(`Token ${item.token} added successfully!`, 'Success');
      this.form.reset();
    } else {
      this.toastr.error('Please fill in all required fields.', 'Error');
    }
  }
}
