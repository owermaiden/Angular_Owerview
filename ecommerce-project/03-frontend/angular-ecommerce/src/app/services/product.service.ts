import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }
  

  getProductListPaginate(thePage: number,
                         thePageSize:number, 
                         theCategoryId: number): Observable<GetResponseProducts> {  

    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }  

  getProductList(theCategoryId: number): Observable<Product[]> {  
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }  

  getSearchProductList(searchWord: string): Observable<Product[]> {    
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${searchWord}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number,
                         thePageSize:number, 
                         searchWord: string): Observable<GetResponseProducts> {  

    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${searchWord}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }  

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories() : Observable<ProductCategory[]> {    
    const searchUrl1 = `${this.baseUrl}/product-category`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl1).pipe(
      map(response => response._embedded.ProductCategory)
    );

  }

  getProductById(theProductId: number) : Observable<Product> {
    const searchUrl2 = `${this.baseUrl}/products/${theProductId}`;
    return this.httpClient.get<Product>(searchUrl2);
  }    
  
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page:{
    size: number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    ProductCategory: ProductCategory[];
  }
}
