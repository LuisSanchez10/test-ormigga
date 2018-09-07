import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { reject } from 'q';


@Injectable()
export class ApigithubService {
 
  info:any;
  errorMsg:any;
  errores:any;
  errorBool:boolean;

  constructor( public http: HttpClient ) {
  }

  getUser(username:string){
  	let promise = new Promise ((resolve, reject) =>{
      this.http.get(`https://api.github.com/users/${ username }/repos`)
	      .subscribe( data =>{
	        this.info = data;
	        this.errorBool = false;
	        resolve();
	      },
	      err => {
	        this.errores = err;
	        this.errorMsg = err.error;
	        this.errorBool = true;
	        resolve();
	      });
	    });
	    return promise;
	  }
}

