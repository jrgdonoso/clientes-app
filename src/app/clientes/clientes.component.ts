import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  //public  listaCliente:Cliente[]=[];
  listaClientes: Cliente[];
  paginador:any;
  pageActive: number;

  constructor(private miClienteService: ClienteService, private activateRouter:ActivatedRoute) {

  }


  ngOnInit() {


    this.activateRouter.paramMap.subscribe(params=>{
      this.pageActive=+params.get('page') ;



      this.miClienteService.getClientes(this.pageActive).pipe(
     
        tap((listClientes:any)=> {
  
          console.log("clientes.component: 3");
          (listClientes.content as Cliente[]).forEach(cli=>{
            console.log(cli.nombre)
          })
        })
      ).subscribe(
        clientes =>{ 
          this.listaClientes = (clientes.content as Cliente[])
          this.paginador=clientes
        }
        
      );






    })
  

   /* this.miClienteService.getClientes().subscribe(
      function(clientes){
        this.listaClientes = clientes;
        console.log("llega hasta aca "+clientes)
      }.bind(this)
    );*/

    

  }



  public eliminar(cliente:Cliente):void{
      
       Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.miClienteService.eliminar(cliente.id).subscribe(
          response=> {
          this.listaClientes=this.listaClientes.filter(cli=> { 
             console.log(cli.id+" v/s "+cliente.id);
             if(cli.id != cliente.id){
               return cli;
             }
          })
        
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        });

        
      }
    })

     //this.miClienteService.eliminar(cliente.id).subscribe(response=> {response as any});
  }




}
