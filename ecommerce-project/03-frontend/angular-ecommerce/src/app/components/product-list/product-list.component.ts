import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = true;
  previousCategoryId: number = 1;
  previousKeyword: string="";

  // pagination fields

  thePageNumber : number = 1;
  thePageSize : number = 5;
  theTotalElements : number = 0;
  
  

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != theKeyword) this.thePageNumber = 1;    
    this.previousKeyword = theKeyword;  

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1,this.thePageSize,theKeyword)
        .subscribe(this.processResult()) 
  }

  handleListProducts() {

    this.currentCategoryId = this.route.snapshot.paramMap.has('id') ? +this.route.snapshot.paramMap.get('id')! : 1;

    if (this.previousCategoryId != this.currentCategoryId) this.thePageNumber = 1;    
    this.previousCategoryId = this.currentCategoryId;    

    this.productService.getProductListPaginate(this.thePageNumber - 1,this.thePageSize,this.currentCategoryId)
        .subscribe(this.processResult());
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
    
  }

  updatePageSize(pageSize : string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }


}
