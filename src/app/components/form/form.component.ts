import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { style, transition, trigger, animate } from '@angular/animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  @Output() formSubmitted = new EventEmitter<void>();

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

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
      const item = {
        id: Math.random(),
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
      return;
    }
  }
}
