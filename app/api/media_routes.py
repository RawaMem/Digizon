from flask import Blueprint, request
from app.models import db, Media
from flask_login import current_user
from app.forms.new_product_form import NewProductForm
from app.colors import CBLUEBG, CEND


media_routes = Blueprint('medias', __name__, url_prefix='/medias')


# get all medias for a user
@media_routes.route('/')
def get_medias():
    medias = Media.query.all()
    return {media.id:media.to_dict() for media in medias}

# get media for single product
@media_routes.route('/<int:id>')
def get_one_media(id):
    media = Media.query.filter(Media.product_id == id).first()
    # print(CBLUEBG, '===========================@@>', media, CEND)
    return media.to_dict()


# delete a single media
@media_routes.route('/delete/<int:id>')
def delete(id):
    deleted_media = Media.query.filter(Media.id == id).first()
    db.session.delete(deleted_media)
    db.session.commit()
    return deleted_media.to_dict()


# create a new media
# @media_routes.route('/new', methods=['POST'])
# def add_new_media():
#     form = NewProductForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#         new_media = Media(
#             user_id=form.data['user_id'],
#             name=form.data['name'],
#             # url=form.data['url'],
#             description=form.data['description'],
#             price=form.data['price'],
#             stock_quantity=form.data['stock_quantity'],
#         )
#         db.session.add(new_media)
#         db.session.commit()

#         new_media = Media(
#             user_id=form.data['user_id'],
#             product_id=new_media.id,
#             url=form.data['url'],
#         )

#         db.session.add(new_media)
#         db.session.commit()
#         return new_media.to_dict()
#     else:
#         return form.errors



# edit a single media
# @media_routes.route('/edit/<int:id>', methods=['PATCH'])
# def edit_product(id):
#     form = EditProductForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#         media = Media.query.filter(Media.id == id).first()

#         media.user_id=current_user.id
#         media.user_id=form.data['user_id']
#         media.name=form.data['name']
#         # url=form.data['url']
#         media.description=form.data['description']
#         media.price=form.data['price']
#         media.stock_quantity=form.data['stock_quantity']

#         db.session.add(media)
#         db.session.commit()

#         new_media = Media(
#             user_id=form.data['user_id'],
#             product_id=media.id,
#             url=form.data['url'],
#         )

#         db.session.add(new_media)
#         db.session.commit()
#         return new_media.to_dict()

#     else:
#         return form.errors





# create pictures for a media
@media_routes.route('/media/new/:userid/:productid', methods=['POST'])
def add_new_media():
    form = NewProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_media = Media(
            user_id=form.data['user_id'],
            title=form.data['title'],
            description=form.data['description'],

        )
        db.session.add(new_media)
        db.session.commit()

        return new_media.to_dict()
    else:
        return form.errors
