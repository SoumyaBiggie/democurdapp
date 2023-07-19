import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.scss']
})
export class ViewlistComponent implements OnInit {

  dataArr: any = [];
  showTbl: boolean = false;

  constructor(
    private appService: AppService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    let d: any = sessionStorage.getItem('registerationData');
    this.dataArr = JSON.parse(d);
    console.log(this.dataArr);
    if (this.dataArr) {
      this.showTbl = true;
    } else {
      this.showTbl = false;
    }
  }

  deleteData(d: any){
    console.log(d);
    let op = this.dataArr.map((x: any) =>{
      if (x.empCode == d.empCode) {
        let index = this.dataArr.indexOf(x);
        index > -1 ? this.dataArr.splice(index, 1) : '';
      }
      let y = JSON.stringify(this.dataArr)
      sessionStorage.setItem('registerationData', y);   
    })
  }
  updateData(d: any){
    console.log(d);
    this.appService.getData(d);
    this._router.navigate(['/dashboard/users/register'])
    // this._router.navigateByUrl('/register')
  }

}
