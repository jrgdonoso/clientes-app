import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {


  @Input() paginador:any;


  constructor(private activatedRoute: ActivatedRoute) { }

  paginas: number[];
  desde:number;
  hasta:number;
  
  ngOnInit() {
    this.initPaginator();
    //this.activatedRoute.paramMap.subscribe(param=>{


     

    //})





  }




  ngOnChanges( changes: SimpleChanges ){
     let paginadorActualizado= changes['paginador'];

      if(paginadorActualizado.previousValue){
        this.initPaginator();
      }

  }



   private initPaginator(): void {
    console.log("paginador.last=> "+this.paginador.last)

    if(  this.paginador.totalPages>5  ){
      console.log("entra al IF")

      this.desde=Math.min(Math.max(1,this.paginador.number -4), this.paginador.totalPages-5);
      this.hasta=Math.max(Math.min(this.paginador.totalPages, this.paginador.number+4), 6);

      
      this.paginas=new Array(   this.hasta -this.desde+1   )
      .fill(0)
      .map((valor,indice)=> {

        return valor=indice+this.desde
      });

    }else{
      console.log("entra al ELSE")
      this.paginas=new Array(this.paginador.totalPages).fill(0).map((indice, valor)=> valor=valor+1);
    }



   }



}
