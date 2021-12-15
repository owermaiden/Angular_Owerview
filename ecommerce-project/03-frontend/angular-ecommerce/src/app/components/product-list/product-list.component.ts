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

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() { 

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentCategoryId = parseInt(params.get('id')!);
      this.listProducts(this.currentCategoryId);
    });
  }

  listProducts(id: number) {

    // let give a default value to id
    if(isNaN(id)) id = 1; 

    // now get the products for the given category id
    this.productService.getProductList(id).subscribe(
      data => {
        this.products = data;
      }
    )
        
  }

}
