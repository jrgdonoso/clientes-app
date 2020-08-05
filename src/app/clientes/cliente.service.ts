import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { CLIENTES } from './clientes.json';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})

export class ClienteService {


  
  private urlEndPoint="http://localhost:8080/api/clientes/";
 private httpHeadders=new HttpHeaders({'Content-Type':'application/json'})



  constructor(  private http:HttpClient  ) { 

  }




 getClientes(): Observable<Cliente[]>{

   //Para consumir el observable desde http, se puede hacer de forma directa o utilizando 
   //map.
   
   //#Forma directa
   //return this.http.get<Cliente[]>(this.urlEndPoint)

   //#utilizando map
   return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
   )

   // #utilizando map pero sin implementar las funciones flechas
   //return this.http.get(this.urlEndPoint).pipe(
    //map(function(response) { return  response as Cliente[]})
   //)

  //#Para consumir datos estaticos y no del servidor backend
   //return of(this.LlenarListaClientes()); //Clientes utilizando funcion array
   ///return of(CLIENTES); //Desde archivo
}


create(cliente:Cliente):Observable<Cliente>{
  return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.httpHeadders})
}


update(cliente:Cliente):Observable<Cliente>{
  return this.http.put<Cliente>(this.urlEndPoint+"/"+cliente.id, cliente, {headers:this.httpHeadders})
}






getClienteById(id:number): Observable<Cliente>{
  return this.http.get(this.urlEndPoint+"/"+id).pipe(
     map(response => response as Cliente)
  )
}





  private LlenarListaClientes(): Cliente[] {
    let listaCli:Cliente[] = [];

    for (let i = 0; i < 10; i++) {
      
      listaCli[i] = { id: i, nombre: "Jorge " + i, apellido: "Donoso " + i, createAt: "01-01-201" + i, email: "jorge@correo" + i + ".cl" }
     
    }

    console.log("desde llenar "+listaCli)
    return listaCli;
  }



  public eliminar(id:number):Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+id+"/", {headers:this.httpHeadders});
  }



}
