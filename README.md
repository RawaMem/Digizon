<br />
<p align="center">

  <h3 align="center">Digizon</h3>
   <p align="center">

</p>
</p>

**Table of Contents**
* [Digizon Overview](#digizon-overview)
* [Technologies Used](#technologies-used)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)

## Digizon Overview
Digizon is a fullstack application that allows users to buy and sell products. Keep track of your products, inventory, and your account balance to stay organzied! Invite your friends and basically print free money!

## Technologies Used
Digizon uses [Python](https://www.python.org/) on the backend with [Flask](https://flask.palletsprojects.com/en/2.0.x/), [SQLAlchemy](https://www.sqlalchemy.org/), and a [Postgresql](https://www.postgresql.org/) database.
On the front end, Digizon is using [Javascript](https://www.javascript.com/) with [React](https://reactjs.org/) and [Redux](https://redux.js.org/). Through React and Redux, the front end requests product data from the backend.
SQLAlchemy and Flask process this request and return data to the front end to be stored in Redux and displayed with React

## Frontend Overview
The frontend consists of React and Redux. Users will log in and then have access to their account. The main page consists of all products on the site.

The user product page displays all the products they have posted for sale. Each product includes useful information such as a picture of the product, name, description, price, and inventory. Users can add, delete, and edit products they have for sale. The user can find their account balance on the top right of their screen.

If a user buys a product, the price is deducted from their balance. If another user buys their products, the price of the items they bought will be added to your user balance. Users can add multiple products to their cart and adjust the quantity that they want to purchase. On the cart page, they can see the total of their purchase, edit the quantity of products they want to purchase, remove products from their cart, and purchase the products in their cart. When the user clicks place your order, their cart is emptied, their balance is updated, and the product inventories are changed according to the quantity of product bought.

## Backend Overview
Flask and SQLAlchemy were used for this project because I wanted to gain more experience with Flask and SQLAlchemy, and because they were able to process the necessary requests. Products are added, editted, and deleted to the database in a standard manner. Products can be linked to user carts and the quantity of each item and the product is kept track of. This way if a user logs out and then logs back in, the products in their cart are saved. Account balances are tied to a user and saved in the database. When a user makes a purchase, the purchase price is deducted from the buyer and added to the seller.

