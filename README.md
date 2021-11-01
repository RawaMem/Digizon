<br />
<p align="center">
  <a href="https://digizon.herokuapp.com/login">
    <img src="https://cdn.discordapp.com/attachments/899805199613448233/903212248716173332/Digizon_2.png" alt="Logo" style="width:150px">
  </a>

  <h3 align="center">Digizon</h3>
   <p align="center">

  [Checkout the Docs!](https://github.com/RawaMem/Digizon/wiki)
</p>
</p>

**Table of Contents**
* [Digizon Overview](#digizon-overview)
* [Technologies Used](#technologies-used)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Future plans](#future-plans)

## Digizon Overview
Digizon is a fullstack application that allows users to buy and sell products. Keep track of your products, inventory, and your account balance to stay organzied! Invite your friends and basically print free money!

## Technologies Used
Digizon uses [Python](https://www.python.org/) on the backend with [Flask](https://flask.palletsprojects.com/en/2.0.x/), [SQLAlchemy](https://www.sqlalchemy.org/), and a [Postgresql](https://www.postgresql.org/) database.
On the front end, Digizon is using [Javascript](https://www.javascript.com/) with [React](https://reactjs.org/) and [Redux](https://redux.js.org/). Through React and Redux, the front end requests product data from the backend.
SQLAlchemy and Flask process this request and return data to the front end to be stored in Redux and displayed with React

## Frontend Overview
The frontend consists of React and Redux. Users will log in and then have access to their account. The main page consists of all products on the site.\
<img src="https://cdn.discordapp.com/attachments/899805199613448233/904546598497972244/Screen_Shot_2021-10-31_at_6.45.09_PM.png" width='600'>


The user product page displays all the products they have posted for sale. Each product includes useful information such as a picture of the product, name, description, price, and inventory. Users can add, delete, and edit products they have for sale. The user can find their account balance on the top right of their screen.\
<img src="https://cdn.discordapp.com/attachments/899805199613448233/904546713816150026/Screen_Shot_2021-10-31_at_6.45.38_PM.png" width='600'>


If a user buys a product, the price is deducted from their balance. If another user buys their products, the price of the items they bought will be added to your user balance. Users can add multiple products to their cart and adjust the quantity that they want to purchase. On the cart page, they can see the total of their purchase, edit the quantity of products they want to purchase, remove products from their cart, and purchase the products in their cart. When the user clicks place your order, their cart is emptied, their balance is updated, and the product inventories are changed according to the quantity of product bought.\
<img src="https://cdn.discordapp.com/attachments/899805199613448233/904546983170170920/Screen_Shot_2021-10-31_at_6.46.42_PM.png" width='600'>

## Backend Overview
Flask and SQLAlchemy were used for this project because I wanted to gain more experience with Flask and SQLAlchemy, and because they were able to process the necessary requests. Products are added, editted, and deleted to the database in a standard manner. Products can be linked to user carts and the quantity of each item and the product is kept track of. This way if a user logs out and then logs back in, the products in their cart are saved. Account balances are tied to a user and saved in the database. When a user makes a purchase, the purchase price is deducted from the buyer and added to the seller.


## Future Plans
This project was a lot of fun to make and I have a lot of features that I would like to implement in the future. The first feature that is already in the works is product reviews and ratings. I want the user to be able to leave reviews and see how products are rated. The Rating will be based off of a 5 point system. I would like to incorporate AWS so that users can store multiple images and video clips of their products on AWS. I am planning to use a map with the location for the product and directions to the product for pick up using [Mapbox GL JS](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/). Mapbox has routing built in and the docs are very well done. Additional features I am planning to add are order histories and product view histories. This will help users keep track of products they are interested in and help them keep track of products they have purchased. Last, but not least, I want to make a help chat for users for any issues that arise. I will be making a Digizon representative account and use [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/) to allow users to chat with a representative regarding any issues that may arise with products.
