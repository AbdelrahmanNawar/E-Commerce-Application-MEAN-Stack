import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/productModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit, DoCheck {
  @Input() product: productModel = {
    category: '',
    isPromoted: 'false',
    details: '',
    image: null,
    price: 0,
    quantity: 0,
    promotion: 0,
    isDeleted: false,
    title: '',
  };
  @Input() productId;
  disabledFlag;
  imgPreview;
  validationMsg='';

  constructor(
    private prdService: ProductsService,
    activatedRouteObj: ActivatedRoute,
    private router: Router
  ) {
    this.productId = activatedRouteObj.snapshot.params['id'] || '0';
    this.disabledFlag = this.product.isPromoted;
    this.getProduct();
  }

  ngOnInit(): void {
    this.getProduct();
  }

  ngDoCheck() {
    if (this.product.isPromoted === 'true') this.disabledFlag = false;
    else this.disabledFlag = true;
  }

  getProduct() {
    this.prdService.getSpecificProduct(this.productId).subscribe(
      (res) => {
        this.product = res[0];
        this.product.image = null;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate['/login'];
          location.replace('/login');
        }
      }
    );
  }

  submitEditedProduct() {
    if (
      this.product.price != 0 &&
      this.product.title != '' &&
      this.product.promotion < this.product.price * 0.6
    ) {
      this.prdService
        .editSpecificProduct(this.productId, this.product)
        .subscribe(
          (res) => {
            this.product = res;
            this.router.navigate['/products'];
            location.replace('/products')

            console.log('edit comp');
            console.log(this.product);
          },
          (err) => {
            if (err.status === 401 || err.status === 403) {
              this.router.navigate['/login'];
              location.replace('/login');
            }
            console.log(err);
            this.validationMsg = err;
          }
        );
      return true;
    } else {
      this.validationMsg = 'Promotion must be less than 60% of the price';
      console.log(this.validationMsg)
      return false;
    }
  }

  selectCategory(cat: string) {
    this.product.category = cat;
  }

  // Image Preview
  uploadFile(event) {
    const fileToUpload = (event.target as HTMLInputElement).files[0];
    this.product.image = fileToUpload;
    const fileName = fileToUpload.name;
    this.product.image = fileToUpload;
    this.product.imageUrl = fileName;

    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(fileToUpload);

    console.log('upload');
    console.log(this.product);
  }

  removeImg() {
    this.product.imageUrl = '/assets/products/default-product-image.png';
    this.product.image = null;
    this.imgPreview = '/assets/products/default-product-image.png';
    console.log(this.product);
  }
}
