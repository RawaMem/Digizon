from flask import Blueprint, request
from app.models import db, Product
from flask_login import current_user
from app.forms.new_product_form import NewProductForm
from app.forms.edit_product_form import EditProductForm
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename

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


# edit a single product
@product_routes.route('/edit/<int:id>', methods=['PATCH'])
def edit_product(id):
    form = EditProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        product = Product.query.filter(Product.id == id).first()

        product.user_id=current_user.id
        product.title=form.data['title']
        product.description=form.data['description']

        db.session.commit()
        return product.to_dict()

    else:
        return form.errors
