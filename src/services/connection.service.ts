import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ConnectionService{

    constructor(private _http: HttpClient){}

    protected SERVER_ADDRESS = 'https://pure-mountain-14455.herokuapp.com';
    httpHeaders: HttpHeaders = new HttpHeaders({'x-access-token': localStorage.getItem('token')} );

    signIn(email: string, password: string): Observable<any>{
        return this._http.post(this.SERVER_ADDRESS + '/autenticar', { usuario: email, senha: password }, { responseType: 'text', observe: 'response' });
    }
    
    signUp(user: Object): Observable<any>{
        return this._http.post(this.SERVER_ADDRESS + '/signup', user, { responseType: 'text' });
    }
    
    getList(address: string): Observable<any>{
        return this._http.get<any>(this.SERVER_ADDRESS + address, { headers: this.httpHeaders });
    }

    addItem(address: string, item: any): Observable<any>{
        return this._http.post(this.SERVER_ADDRESS + address, item ,{ headers: this.httpHeaders});
    }

    removeItem(address: string, id: number): Observable<any>{
        return this._http.delete(this.SERVER_ADDRESS + address + '/' + id, { headers: this.httpHeaders});
    }

    updateItem(address: string, item: any, id: number): Observable<any>{
        return this._http.put(this.SERVER_ADDRESS + address + '/' + id, item ,{ headers: this.httpHeaders});
    }

}