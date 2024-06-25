import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
AuthService
Router

@Component({

  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isloading : boolean = false;

  errorMessage! :string ;
  constructor(private _AuthService:AuthService , private _Router:Router){}
registerForm : FormGroup = new FormGroup({
  //لازم اسمي هنا بنفس الاسم الي جي ف الساين اب 
  name: new FormControl(null ,[Validators.required , Validators.minLength(3) ,Validators.maxLength(15)]),
  email: new FormControl(null ,[ Validators.required ,Validators.email]),
  password :new FormControl(null , [Validators.required ,
    Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/
        ),]),
  password_confirme :new FormControl(null, [Validators.required ,
    Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/
        ),] ),
  phone_number :new FormControl(null,[ Validators.required,

        Validators.pattern(/^(01)[0125][0-9]{8}$/),]),
  
} , this.hamada )
registerSubmit(){
  this.isloading =true
this._AuthService.registerAPI ( this.registerForm.value) .subscribe({
  next : (res)=>{
    console.log(res);
    this.isloading =false ;
    //programing router المفروض هنا هيحولني لصفحه اللوجن بقي
    
  this._Router.navigate(['/login' ])
  } ,
  
  error : (err)=>{
   this.errorMessage = err.error.message;
   this.isloading =false

  } ,
})
}
hamada(g:any)
{
if (  g.get ('password')?.value ==   g.get ('password_confirme')?.value)
  {
    return null
  }
  else{
    return {"matchedPassword" : true}
  }
}
}
