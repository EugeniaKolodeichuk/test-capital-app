import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      company: ['my', Validators.required],
      token: ['', Validators.required],
      symbol: ['', Validators.required],
      supply: ['', Validators.required],
      chain: ['enthereum', Validators.required],
      isEnabled: [true, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.valid);

    // submit the form data to the server or perform any other action
  }
}
