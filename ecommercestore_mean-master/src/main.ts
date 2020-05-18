import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


// <script src="js/jquery-1.12.1.min.js"></script>
//     <script src="js/popper.min.js"></script>
//     <script src="js/bootstrap.min.js"></script>
//     <script src="js/jquery.magnific-popup.js"></script>
//     <script src="js/swiper.min.js"></script>
//     <script src="js/mixitup.min.js"></script>
//     <script src="js/price_rangs.js"></script>
//     <script src="js/owl.carousel.min.js"></script>
//     <script src="js/jquery.nice-select.min.js"></script>
//     <script src="js/slick.min.js"></script>
//     <script src="js/jquery.counterup.min.js"></script>
//     <script src="js/waypoints.min.js"></script>
//     <script src="js/contact.js"></script>
//     <script src="js/jquery.ajaxchimp.min.js"></script>
//     <script src="js/jquery.form.js"></script>
//     <script src="js/jquery.validate.min.js"></script>
//     <script src="js/mail-script.js"></script>
//     <script src="js/custom.js"></script>

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
