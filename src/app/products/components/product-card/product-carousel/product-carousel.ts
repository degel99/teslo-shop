import { AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';


@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  styles: `
  .swiper {
    width: 100%;
    height: 500px;
  }
  `
})
export class ProductCarousel implements AfterViewInit, OnChanges {

  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  swipper: Swiper | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return;
    }

    if( !this.swipper) return;

    this.swipper.destroy(true, true);

    const paginationEl = this.swiperDiv().nativeElement?.querySelector('.swiper-pagination');
    paginationEl.innerHTML = '';

    setTimeout(() => {
      this.swipperInit();
    }, 100);
  }

  ngAfterViewInit(): void {
    this.swipperInit();
  }

  swipperInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    this.swipper = new Swiper(element, {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    modules:  [
      Navigation, Pagination
    ],

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    });
  }
 }
