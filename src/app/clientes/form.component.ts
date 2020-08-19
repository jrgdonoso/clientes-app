import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})



export class FormComponent implements OnInit {

  public cliente: Cliente=new Cliente();
  public titulo: String="Crear Cliente";
  public errores: String[];
  
  constructor( 
    private miClienteService:ClienteService,
     private router:Router ,
     private MiRouterActive:ActivatedRoute
     
     ) { }

  ngOnInit() {
    this.cargarCliente();
  }

 


 public cargarCliente():void{
      
  this.MiRouterActive.params.subscribe(
    params=> {
      let id=params['id'];
      if(id){
        console.log("pasa por aca !!!");
        this.miClienteService.getClienteById(id).subscribe(
          cliente => this.cliente = cliente
        );
      }
    }
  )



  

 }



  public create():void{
       console.log("Checked!!");
       console.log(this.cliente);
       this.miClienteService.create(this.cliente).subscribe(
         response =>{ 
           this.router.navigate(['clientes'])
           Swal.fire({
            title: 'Cliente agregado',
            text: 'Cliente '+response.nombre+' agregado exitosamente!!',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          },
          err=> {
            this.errores= err.error.errors as String[];
            console.error('Codigo error desde el backend: '+err.status)
            console.error(err.error.errors)
            //console.log( "json errores "+JSON.stringify(this.errores.error) )

          }
       );
  }





 







  public update():void{
    console.log("update Checked!!");
    console.log(this.cliente);
    this.miClienteService.update(this.cliente).subscribe(
      response =>{ 
        this.router.navigate(['clientes'])
        Swal.fire({
         title: 'Cliente Actualizado',
         text: 'Cliente '+response.cliente.nombre+' actualizado exitosamente!!',
         icon: 'success',
         confirmButtonText: 'Cool'
       })

       },
       err=> {
        this.errores= err as String[];
        console.error('Codigo error desde el backend: '+err.status)
        console.error(err.error.errors)
      }
    );




   
}


  




}

//Binding entre cliente formulario se realiza con las directivas ngmodule y el nombre del input se mapea con 
//el nombre del atributo del objeto
