import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, products } from '../products';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  // 現在の商品をカートに追加する
  // addToCartをaddToCartで囲い直している。これ面倒くさくない？
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('かうよーん');
  }

  // 特定の商品詳細ページにナビゲートしたときに、その商品のIDに基づいて適切な商品情報を取得する
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
  
    this.product = products.find(product => product.id === productIdFromRoute);
  }
}