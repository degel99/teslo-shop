import { Component, inject } from '@angular/core';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender )
    )
  );

  productsResource = rxResource({
    request: ()=> ({ gender: this.gender() }),
    loader: ({ request }) => {
      return this.productsService.getProducts({gender: request.gender});
    }
  })
 }
