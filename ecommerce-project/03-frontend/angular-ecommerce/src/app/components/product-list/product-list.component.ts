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
  currentCategoryId: number | undefined;
  searchWord : string = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listProductsBy(params);
    });
  }

  listProductsBy(params: ParamMap){

    this.currentCategoryId = parseInt(params.get('id')!);
    this.searchWord = params.get('keyword')!;

    if (this.currentCategoryId){
      this.productService.getProductList(this.currentCategoryId).subscribe(
        data => {
          this.products = data;
        }
      ) 
    } else if (this.searchWord){
      this.productService.getSearchProductList(this.searchWord).subscribe(
        data => {
          this.products = data;
        }
      ) 
    }
  }


}
