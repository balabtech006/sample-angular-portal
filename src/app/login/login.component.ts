import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { first } from 'rxjs/operators';
import { NotifierService } from "angular-notifier";
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  urlData:any ='';
  loginGroup: any = {};
  submitted:boolean = false
  constructor(private router: Router,private formBuilder: FormBuilder,private authService: AuthService, private notifiy: NotifierService,private spinner: SpinnerVisibilityService,private activatedRoute: ActivatedRoute) {
   }
  ngOnInit(): void {
    let LoggedCheck = this.authService.isAuthenticated()
    if(LoggedCheck)
    {
      this.btnNavigation('/dashboard');
    }
    this.loginForm = this.formBuilder.group({
      _id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  btnNavigation(url){
    this.router.navigate([url]);
  }

  async submitLogin()
  {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return; // If validation failed
    }
    this.spinner.show();
      try{
         let promise = new Promise(async (resolve, reject) => {
          const datas:any = await this.authService.login(this.loginGroup)
          console.log("login",datas);
          switch(datas){
            case 0:
              this.notifiy.notify("error","Username & Password Invalid");
              break;
            case 2:
              this.notifiy.notify("error","Username not activated or Password Incorect");
              break;
            default:
              localStorage.setItem('metaLog',JSON.stringify(datas));
              this.notifiy.notify("success","Login Successfull");
              this.btnNavigation('/dashboard');
          }
          this.spinner.hide();
          });
       
       }catch(exe)
       {
        this.notifiy.notify("error","Login Failed");
        this.btnNavigation('/login')
         console.log('Eror',exe)
         this.spinner.hide();
       }
  }


}
