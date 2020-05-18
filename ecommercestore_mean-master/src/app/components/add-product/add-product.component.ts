import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';
import { productModel } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, DoCheck {
  @Input() newProductObj: productModel = {
    category: 'men',
    isPromoted: 'false',
    details: '',
    image: null,
    price: 0,
    quantity: 0,
    promotion: 0,
    isDeleted: false,
    title: '',
  };
  @Output() isPromotedCheckEvent = new EventEmitter();
  disabledFlag: boolean = true;
  imgPreview;
  validationMsg='';

  constructor(private prdService: ProductsService, private router: Router) {}

  ngOnInit() {}

  ngDoCheck() {
    if (this.newProductObj.isPromoted === 'true') this.disabledFlag = false;
    else this.disabledFlag = true;
  }

  selectCategory(cat: string) {
    this.newProductObj.category = cat;
  }

  addNewProduct() {
    if (
      this.newProductObj.price != 0 &&
      this.newProductObj.title != '' &&
      this.newProductObj.promotion < this.newProductObj.price * 0.6
    ){
      this.prdService.addNewProduct(this.newProductObj).subscribe(
        (res: productModel) => {
          this.newProductObj = res;
          this.router.navigate['/products'];
          location.replace('/products')
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

  // Image Preview
  uploadFile(event) {
    const fileToUpload = (event.target as HTMLInputElement).files[0];
    this.newProductObj.image = fileToUpload;
    const fileName = fileToUpload.name;
    this.newProductObj.image = fileToUpload;
    this.newProductObj.imageUrl = fileName;

    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(fileToUpload);
  }

  removeImg() {
    console.log(this.newProductObj);
    this.newProductObj.imageUrl = '/assets/products/default-product-image.png';
    this.newProductObj.image = null;
    this.imgPreview = '/assets/products/default-product-image.png';
  }

  cancelAddingProduct() {
    this.newProductObj = {};
  }
}
