import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength = 0;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // ovo prvo je za regularnopravljenje reactive forms
    // this.employeeForm = new FormGroup( {
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });
    // ovo je za pravljenje preko formbuildera
    this.employeeForm = this.fb.group({
      // ispod: fakticki je array i prvi element u arrayu je default value i ovde je empty
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner']
      })
    });

    // this.employeeForm.get('fullName').valueChanges.subscribe((value: string) => {
    //   // console.log(value);
    //   this.fullNameLength = value.length;
    // });
    // this.employeeForm.valueChanges.subscribe((value: any) => {
    //   console.log(JSON.stringify(value));
    // });
    // this.employeeForm.get('skills').valueChanges.subscribe((value: any) => {
    //   console.log(JSON.stringify(value));
    // });
  }

  logKeyValuePairs(group: FormGroup): void {
    // console.log(Object.keys(group.controls)); // ispisuje samo kljuceve i nista vise, ali nece nestovane
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
          this.logKeyValuePairs(abstractControl); //znaci ovde radi sa nestovanim i poziva opet metodu i ide u else
        // abstractControl.disable(); // ovako bi sve bilo disablovano samo nestovani

      } else {
        // console.log('Key = ' + key + ' Value = ' + abstractControl.value);
        // abstractControl.disable(); // ovako bi sve bilo disablovano kad bi se kliknulo
        abstractControl.markAsDirty(); // ovako bi svi bili dirty
      }
    });
  }

// setValue moze da prodje samo ako setujem sve vrednosti a ako necu sve onda ide patchValue
// to je za velike forme i da se zastitimo da nesto nije uneto
  onLoadDataClick(): void {
    // this.employeeForm.setValue({
    //   fullName: 'Sloba',
    //   email: 'email@email.com',
    //   skills: {
    //     skillName: 'Angular',
    //     experienceInYears: 5,
    //     proficiency: 'intermediate'
    //   }
    // });
    this.logKeyValuePairs(this.employeeForm);
  }
  // znaci patchValue je samo kad imam deo koji hocu da lodujem a ne sve,
  // mogu koristiti patchValue da loadujem i sve podatke sa forme
  onPatchDataClick(): void {
    this.employeeForm.patchValue({
      fullName: 'Sloba',
      email: 'email@email.com',
      // skills: {
      //   skillName: 'Angular',
      //   experienceInYears: 5,
      //   proficiency: 'intermediate'
      // }
    });
  }

  onSubmit(): void {
    // console.log(this.employeeForm); //izlistace sve opcije i sta mogu sa njima nor value, dirty...

    // console.log(this.employeeForm.controls.fullName.touched); //moze na oba nacina
    // console.log(this.employeeForm.get('fullName').value);

  }

}
