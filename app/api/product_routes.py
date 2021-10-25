from flask import Blueprint, request
from app.models import db, Product, Media, Cart
from flask_login import current_user
from app.forms.new_product_form import NewProductForm
from app.forms.edit_product_form import EditProductForm
# from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
from app.colors import CBLUEBG, CEND

product_routes = Blueprint('products', __name__, url_prefix='/products')


# get all products for a user
@product_routes.route('/')
def get_products():
    products = Product.query.all()
    return {product.id:product.to_dict() for product in products}

# get single product
@product_routes.route('/<int:id>')
def get_one_product(id):
    product = Product.query.filter(Product.id == id).first()
    return product.to_dict()


# delete a single product
@product_routes.route('/delete/<int:id>')
def delete(id):
    deleted_product = Product.query.filter(Product.id == id).first()
    db.session.delete(deleted_product)
    db.session.commit()
    return deleted_product.to_dict()


# create a new product
@product_routes.route('/new', methods=['POST'])
def add_new_product():
    form = NewProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print(CBLUEBG, ' create new product form validate is working', CEND)
        new_product = Product(
            user_id=form.data['user_id'],
            name=form.data['name'],
            cover_img_url=form.data['cover_img_url'],
            description=form.data['description'],
            price=form.data['price'],
            stock_quantity=form.data['stock_quantity'],
        )
        db.session.add(new_product)
        db.session.commit()

        db.session.commit()
        return new_product.to_dict()
    else:
        return form.errors



# edit a single product
@product_routes.route('/edit/<int:id>', methods=['PATCH'])
def edit_product(id):
    form = EditProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        product = Product.query.filter(Product.id == id).first()

        # product.user_id=current_user.id
        # product.user_id=form.data['user_id']
        product.name=form.data['name']
        product.description=form.data['description']
        product.cover_img_url=form.data['cover_img_url']
        product.price=form.data['price']
        product.stock_quantity=form.data['stock_quantity']

        db.session.add(product)
        db.session.commit()

        # new_media = Media(
        #     user_id=form.data['user_id'],
        #     product_id=product.id,
        #     url=form.data['url'],
        # )
        # db.session.add(new_media)
        # db.session.commit()
        return product.to_dict()

    else:
        return form.errors




# create pictures for a product
@product_routes.route('/media/new/:userid/:productid', methods=['POST'])
def add_new_media():
    form = NewProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_product = Product(
            user_id=form.data['user_id'],
            title=form.data['title'],
            description=form.data['description'],
        )
        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()
    else:
        return form.errors




# get all carts for a user
@product_routes.route('/cart/')
def get_carts():
    carts = Cart.query.all()
    return {cart.id:cart.to_dict() for cart in carts}


# get single cart
@product_routes.route('/cart/<int:id>')
def get_one_cart(id):
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    productsList = list(cart.values)
    quantities = {product.id: product.quantity_in_cart for product in productsList}
    return {"cart": cart.to_dict(), "quantityObj": quantities}


# delete a product from cart
@product_routes.route('/cart/delete/<int:productId>')
def delete_product_from_cart(productId):
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    product = Product.query.filter(Product.id == productId).first()
    del cart.products[id]
    product.quantity_in_cart = 0
    db.session.add(product)
    db.session.add(cart)
    db.session.commit()
    return {"cart": cart.to_dict(), "productId": productId, 'product': product.to_dict()}


# add product to cart
@product_routes.route('/cart/add/<int:productId>/<int:quantity>', methods=['POST'])
def add_new_product_to_cart(productId, quantity):
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    product = Product.query.filter(Product.id == productId).first()
    product.quantity_in_cart = quantity
    cart.products[product.id] = product
    db.session.add(product)
    db.session.add(cart)
    db.session.commit()

    return {"cart": cart.to_dict(), "productId": productId, "quantity": quantity, 'product': product.to_dict()}




# Edit Quantity Of Product In Cart
@product_routes.route('/cart/edit/<int:productId>/<int:quantity>', methods=['PATCH'])
def edit_quantity_of_product(productId, quantity):
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    product = Product.query.filter(Product.id == productId).first()
    product.quantity_in_cart = quantity
    cart.products[product.id] = product
    db.session.add(product)
    db.session.add(cart)
    db.session.commit()
    return {"cart": cart.to_dict(), "productId": productId, "quantity": quantity, 'product': product.to_dict()}
