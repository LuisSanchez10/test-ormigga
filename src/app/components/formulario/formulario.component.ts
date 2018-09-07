import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApigithubService } from '../../services/apigithub.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public form: FormGroup;
  haydata:number = 0;
  haycookie:boolean = false;
  filter:string;
  data:any[] = [];
  hola:any[] = [];
  p:number = 1;
  userFilter: any = { name: '' };
  username:string;
  cookieValue:any;
  repo_filter:any[] = [];
  texto:string = "";
  
  constructor(private formBuilder: FormBuilder, private apiService:ApigithubService, private cookieService: CookieService) { }

  ngOnInit() {
  	this.form = this.formBuilder.group({
  		name : ['', Validators.required],
  		lastname : ['', Validators.required],
  		dni : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
  		date : ['', Validators.required],
  		email : ['', [Validators.required, Validators.email]],
  		address : ['', Validators.required],
  	});
  }

  send(){
  	this.username = this.form.get('address').value;
  	this.viewRepo(this.username);
  	this.saveCookie();
  }

  viewRepo(user){
  	this.haydata = 0;
  	this.apiService.getUser(user).then(()=>{
  		console.log(this.apiService.errorBool);
  		console.log(this.apiService.info);
  		if(this.apiService.info.length == 0){
  			this.haydata = 1;
  		}else{
  			this.haydata = 2;
  			this.data = this.apiService.info;
  			this.hola = this.data;
  		}
  	})
  }

  getData(user){
  	this.apiService.getUser(user).then(()=>{
  			this.data = this.apiService.info;
  	});
  }

  filtrar(termino:string){
  	this.repo_filter = [];
  	termino = termino.toLowerCase();
  	this.hola.forEach(repo =>{
  		if ( repo.name.toLowerCase().indexOf(termino) >= 0 ) {
        	if(this.repo_filter.length <= 4){
        		this.repo_filter.push(repo);
        	}
      }
  	})
  }

  search(termino:string){
  	if(termino.length >= 3){
  		this.filtrar(termino);
	  	this.data = this.repo_filter;
  	}
  	if(termino == ''){
  		this.getData(this.form.get('address').value);
  	}
  }


  saveCookie(){
  	var name = this.form.get('name').value;
  	var lastname = this.form.get('lastname').value;
  	var dni = this.form.get('dni').value;
  	var date = this.form.get('date').value;
  	var email = this.form.get('email').value;
  	var username = this.form.get('address').value;
  	this.cookieService.set( 'Nombre', name );
  	this.cookieService.set( 'Apellido', lastname );
  	this.cookieService.set( 'Cedula', dni );
  	this.cookieService.set( 'Fecha de nacimiento', date);
  	this.cookieService.set( 'Correo electrónico', email );
  	this.cookieService.set( 'Username Github', username );
  	this.cookieValue = JSON.stringify(this.cookieService.getAll());
  	this.haycookie = true;
  }

}
