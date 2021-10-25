from flask import Blueprint, request
from app.models import db, Cart, Product
from flask_login import current_user
from app.forms.new_product_form import NewProductForm
from app.forms.edit_product_form import EditProductForm

cart_routes = Blueprint('carts', __name__, url_prefix='/carts')


# get all carts for a user
@cart_routes.route('/')
def get_carts():
    carts = Cart.query.all()

    return {cart.id:cart.to_dict() for cart in carts}

# get single cart
@cart_routes.route('/<int:id>')
def get_one_cart(id):
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    return cart.to_dict()


# delete a product from cart
@cart_routes.route('/delete/<int:productId>/<int:quantity>')
def delete(productId, quantity):
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    product = Product.query.filter(Product.id == productId).first()
    del cart.products[id]
    product.stock_quantity = ((product.stock_quantity) + quantity)
    db.session.add(product)
    db.session.add(cart)
    db.session.commit()
    return {"cart": cart.to_dict(), "productId": productId}


# add product to cart
@cart_routes.route('/add/<int:productId>/<int:quantity>', methods=['POST'])
def add_new_product_to_cart(productId, quantity):
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    product = Product.query.filter(Product.id == productId).first()
    cart.products[product.id] = product
    product.stock_quantity = ((product.stock_quantity) - quantity)
    db.session.add(product)
    db.session.add(cart)
    db.session.commit()

    return {"cart": cart.to_dict(), "productId": productId, "quantity": quantity}




# Edit Quantity Of Product In Cart
@cart_routes.route('/edit/<int:productId>/<int:quantity>', methods=['PATCH'])
def edit_quantity_of_prouct(productId, quantity):
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    product = Product.query.filter(Product.id == productId).first()

    cart.products[product.id] = product




    db.session.add(cart)
    db.session.commit()
