import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      company: ['My company', Validators.required],
      token: ['', Validators.required],
      symbol: ['', Validators.required],
      supply: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      chain: ['Ethereum', Validators.required],
      isEnabled: [true, Validators.required]
    });
  }

  onSubmit() {
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

      this.form.reset();
    } else {
      return
    }



    // submit the form data to the server or perform any other action
  }
}
