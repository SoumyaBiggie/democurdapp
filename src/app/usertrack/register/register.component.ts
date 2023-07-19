import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  dataArr: any = [];
  updt: boolean = false;
  updatedata: any;

  constructor(
    private appService: AppService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      mob: new FormControl(''),
      email: new FormControl(''),
      empCode: new FormControl(''),
      dept: new FormControl(''),
      add: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.updt = false;
    this.appService.$sessionData.subscribe((res: any) => {
      console.log(res);
      this.updatedata = res;
      console.log(this.updatedata);
    });

    this.patchFormVal();
  }



  patchFormVal = () => {
    this.updatedata != 'error' ?  this.updt = true : false;
    this.registerForm.patchValue({
      name: this.updatedata.name,
      mob: this.updatedata.mob,
      email: this.updatedata.email,
      empCode: this.updatedata.empCode,
      dept: this.updatedata.dept,
      add: this.updatedata.add,
    })
  }


  onSubmit = (mode: any) => {
    if (mode == 'add') {
      this.dataArr.push(this.registerForm.value);
      let x = JSON.stringify(this.dataArr)
      sessionStorage.setItem('registerationData', x);
    } else {

      let d: any = JSON.parse(sessionStorage.getItem('registerationData') as any);
      let op = d.map((x: any) =>{
        if (x.empCode == this.registerForm.value.empCode) {
          let index = d.indexOf(x);
          index > -1 ? d.splice(index, 1) : '';
        }   
      });
      d.push(this.registerForm.value);
      sessionStorage.setItem('registerationData', JSON.stringify(d));
    }

  }

}
