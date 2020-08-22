import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { CLIENTES } from './clientes.json';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate,registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';






@Injectable({
  providedIn: 'root'
})

export class ClienteService {


  page :number=0;
  private urlEndPoint="http://localhost:8080/api/clientes/page";
 private httpHeadders=new HttpHeaders({'Content-Type':'application/json'})



  constructor(  private http:HttpClient , private route:Router ) { 

  }




// getClientes(page): Observable<Cliente[]>{
  getClientes(page:number): Observable<any>{
   //Para consumir el observable desde http, se puede hacer de forma directa o utilizando 
   //map.
   
   //#Forma directa
   //return this.http.get<Cliente[]>(this.urlEndPoint)

   //#utilizando map
   
   return this.http.get(this.urlEndPoint+"/"+page).pipe(
      
    //utilizamos tap solo para probar su utilizacion
    tap( (response:any) => {
      let listClientes= (response.content as Cliente[]);
      //console.log("clienteService: 1")
      listClientes.forEach(cliente=>console.log())
    }),
  
    map( (response:any) =>  {
        let responseClientes=(response.content as Cliente[])
        responseClientes.map(cli=> {
          cli.nombre=cli.nombre.toUpperCase();
          registerLocaleData(localeEs, 'es');
          cli.createAt=formatDate( cli.createAt,"EEEE, dd-MM-yyyy", "es")
          return cli;
        })

        //return responseClientes;
        return response;
      }),


      tap(lClientes=> {
        //console.log("clienteService: 2");
        (lClientes.content as Cliente[]).forEach( cli=> console.log() )
      })



     
      
      
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
  return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.httpHeadders}).pipe(

      map( (response:any)=> response.cliente as Cliente),

      catchError(e=> {

        //validaciones backend
        if(e.status == 400){
          alert("Error validacion")
          return throwError(e);
        }


        //Error en try del backend
        Swal.fire({
          title: e.error.Mensaje,
          text: e.error.error,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
            
             return throwError(e);

      })

  )
}


update(cliente:Cliente):Observable<any>{
  return this.http.put<any>(this.urlEndPoint+"/"+cliente.id, cliente, {headers:this.httpHeadders}).pipe(

    catchError(e=> {

      //validaciones backend
      if(e.status == 400){
        alert("Error validacion")
        return throwError(e);
      }


      Swal.fire({
        title: e.error.Mensaje,
        text: e.error.error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
           return throwError(e);
    })

)
}
/*
update(cliente:Cliente):Observable<Cliente>{
  return this.http.put<Cliente>(this.urlEndPoint+"/"+cliente.id, cliente, {headers:this.httpHeadders}).pipe(

    catchError(e=> {
      Swal.fire({
        title: e.error.Mensaje,
        text: e.error.error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
           return throwError(e);
    })

)
}*/







getClienteById(id:number): Observable<Cliente>{
  return this.http.get(this.urlEndPoint+"/"+id).pipe(
     map(response => response as Cliente)
  ).pipe(catchError(e=>{  
    this.route.navigate(["/clientes"])
    Swal.fire({
      title: 'Error',
      text: e.error.mensaje,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
       return throwError(e) 
      })
    )
}


/*getClienteById(id:number): Observable<Cliente>{
  return this.http.get<Cliente>(this.urlEndPoint+"/"+id).pipe(
        catchError(e => {
          console.error("Error")
          return throwError(e);
        })
    )
}*/




  private LlenarListaClientes(): Cliente[] {
    let listaCli:Cliente[] = [];

    for (let i = 0; i < 10; i++) {
      
      listaCli[i] = { id: i, nombre: "Jorge " + i, apellido: "Donoso " + i, createAt: "01-01-201" + i, email: "jorge@correo" + i + ".cl" }
     
    }

    console.log("desde llenar "+listaCli)
    return listaCli;
  }



  public eliminar(id:number):Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+id+"/", {headers:this.httpHeadders}).pipe(

      catchError(e=> {
        Swal.fire({
          title: e.error.Mensaje,
          text: e.error.error,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
            
             return throwError(e);

      })

  )
  }



}
