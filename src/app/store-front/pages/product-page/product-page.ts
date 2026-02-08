import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarousel } from "@products/components/product-card/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];


  productsResource = rxResource({
    request: ()=> ({ idSlug: this.productIdSlug }),
    loader: ({ request }) =>
      this.productService.getProductByIdSlug(request.idSlug)
  })
 }
