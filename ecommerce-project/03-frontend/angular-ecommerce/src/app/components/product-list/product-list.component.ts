import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { pipe, switchMap } from 'rxjs';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number | undefined;
  searchWord : string = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentCategoryId = parseInt(params.get('id')!);
      this.searchWord = params.get('keyword')!;
      if (this.currentCategoryId){
        this.listProducts(this.currentCategoryId);
      } else if (this.searchWord){
        this.listSearchProducts(this.searchWord);
      }
    });
  }

  listSearchProducts(searchWord: string) {
    this.productService.getSearchProductList(searchWord).subscribe(
      data => {
        this.products = data;
      }
    ) 
  }

  listProducts(id: number) {    
    this.productService.getProductList(id).subscribe(
      data => {
        this.products = data;
      }
    )        
  }

}
