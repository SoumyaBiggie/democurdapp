import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { assetUrl } from 'src/single-spa/asset-url';
// import { AppService } from './app.service';



export interface NavItem { 
  displayName?: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  color?: string;
  statusName?: string;
  show?: any;
  parent?: boolean;
  children?: NavItem[];
}
const navitems: NavItem[] = [
  {
    parent: false,
    displayName: 'Register',
    iconName: 'fa fa-user-plus',
    route: 'users/register',
  },
  {
    parent: false,
    displayName: 'List',
    iconName: 'fa fa-list',
    route: 'users/lists',
  }
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  change_password_form: FormGroup;
  title = 'droneTracker';
  demo: any;
  showChild: boolean = false;
  currentIndex: any;
  hamburger_change: boolean = false;
  mobile_header:boolean = false;
  hamburger_changemble:boolean = false;
  dropdown: boolean = false;
  userName: any = '';
  brand_name: any = 'flytbase';
  wallet1: any = 1234;
  wallet2: any = 9089;
  angle: boolean = true;
  top_ang: boolean = true;
  otp_mod: boolean = false;
  @ViewChild('changePassword', { static: false }) private change_password: any;
  otp_btn: boolean = true;
  positionNew: any;



  constructor(
    // private _appService: AppService,
    private _router:Router
  ){
    this.demo = navitems;
    this.change_password_form = new FormGroup({
      old_pwd: new FormControl('',[Validators.required]),
      new_pwd: new FormControl('',[Validators.required]),
      cnf_pwd: new FormControl('',[Validators.required])
    })
  }


  logout(){
    this._router.navigateByUrl('/login');
  }
  
  async ngOnInit(){
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          this.positionNew = position.coords;
          let { latitude, longitude } = this.positionNew;
          localStorage.setItem('lctnCordn', btoa(JSON.stringify({ latitude, longitude })));
        },
        error => {
          console.log(error);
          if (error.code === 1) {
            this.locationAlerts(false, error.message);
          } else if (error.code === 2) {
            let { latitude, longitude } = { latitude: '32.34118', longitude: '67.80679' }
            localStorage.setItem('lctnCordn', btoa(JSON.stringify({ latitude, longitude })));
          }
        }
      );
    } else {
      // this.locatonGeoFlag = true;
      this.locationAlerts(true, '');
    }
  }
  show_dropdown = () =>{
    this.dropdown = !this.dropdown;
  }
  navCollapse(e:any){
    console.log(e);
    this.currentIndex = e;
    this.showChild = !this.showChild;
    this.angle = !this.angle;
    this.top_ang = this.angle ? !this.angle : !this.angle;

  }
  toggle_bar(){
    console.log("ss");
    this.hamburger_change = !this.hamburger_change
  }

  
  locationAlerts(type: boolean, msg: string) {
    let notify: any;
    let alertHtml = type;
    if (alertHtml) {
      alert(msg);
    } else {
      notify = {
        message: `Error: ${msg}`,
        status: 'error'
      };
    }
  }
}


