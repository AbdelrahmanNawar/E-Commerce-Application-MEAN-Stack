TECHNOLOGIES
------------
Backend: Node.js using express and mongodb.
Frontend: Angular Framework.

FEATURES
--------
Here’s a summary of our application, but also you can watch our demo in the ‘Demo Video’ folder.


ANONYMOUS:
----------
Any anonymous’ navbar has links for: Homepage, About, Contact us, Login and Register.
The home page only contains the promoted products. (for all users’ types).
He can’t see any products (but promoted ones) via products tab or search bar if he did not sign in.
If he tries to browse “Products list, Orders or Users one”, he’ll be redirected to the Login page.

-------------------------------------------------------------

MEMBER:
-------
Any new registered user is assigned as a “member” and only one user is assigned as an “admin” in the database.
The member’s navbar has links for: Homepage, Profile, Products, About, Contact us, Search, Shopping Cart icon and Logout.
The user’s profile page has the following:
The user’s photo (a default gender specific one if he didn’t upload any) and a button for uploading a new one.
The user’s information.
Edit profile tab to edit his information using his password to confirm the edits.
Change password tab.
The user’s orders tab (divided into 3 categories “pending orders, accepted and rejected ones”).
While searching for a product and pressing on it you can see its details.
The products page has the following:
The products are divided into subcategories: “Men, Women, Children, All Products, On Sale Ones”.
If you pressed on any product you will see its whole details.
If you pressed on the “Add To Cart” icon you’ll add it into your shopping cart while browsing the rest of the products.
There’s paging to go to the next bunch of products to facilitate the browsing process.
User’s search bar allows the users to search for any product by its name without even pressing enter.
Shopping Cart icon has the following:
It saves the products  you have ordered into a list while continuing browsing.
In the shopping cart there’s two buttons. (checkout and reset)
Checkout button to place the order if you are done browsing, it redirects to a confirmation page with the products you’re ordering with the count of each product which you can increase till you get the whole quantity of this product or decrease it. 
Reset button to clear your shopping cart.
If he tries to browse “Orders list or Users one”, he’ll be redirected to the No Access page.
Logout makes you an anonymous user.

-------------------------------------------------------------

ADMIN:
------
The admin’s navbar has links for: Homepage, Profile, Products, Orders, Users, About, Contact us, Search, Shopping Cart icon and Logout.
In the Products tab, the admin can either view the list of products, edit a specific products’s information, create a new product or even delete a specific one.
In the Orders tab, the admin can either view the list of orders which are divided into 3 subcategories (Pending, Accepted, Rejected).
In the Pending category the admin can either accept the order, reject it or see its details.
In the Users tab, the admin can either view the list of users. (Extra point which was not in the requirements).
The admin can have the same functionality as any member like shopping, ordering, having a profile, ..etc.



