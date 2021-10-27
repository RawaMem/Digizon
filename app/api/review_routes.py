from flask import Blueprint, request
from app.forms.edit_review_form import EditReviewForm
from app.forms.new_review_form import NewReviewForm
from app.models import db, Product, Media, Cart, User, Review
from flask_login import current_user
from app.colors import CBLUEBG, CEND


review_routes = Blueprint('review', __name__, url_prefix='/reviews')


@review_routes.route('/')
def get_reviews():
    reviews = Review.query.all()
    return {review.id:review.to_dict() for review in reviews}


@review_routes.route('/delete/<int:id>')
def delete(id):
    deleted_review = Review.query.filter(Review.id == id).first()
    # print(CBLUEBG, ' delete route running', deleted_review, CEND)
    db.session.delete(deleted_review)
    db.session.commit()
    return deleted_review.to_dict()



@review_routes.route('/new', methods=['POST'])
def add_new_review():
    form = NewReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # print(CBLUEBG, ' create new review form validate is working', CEND)
        new_review = Review(
            user_id=form.data['user_id'],
            product_id=form.data['product_id'],
            rating=form.data['rating'],
            content=form.data['content']
        )
        db.session.add(new_review)
        db.session.commit()

        db.session.commit()
        return new_review.to_dict()
    else:
        return form.errors



@review_routes.route('/edit/<int:id>', methods=['PATCH'])
def edit_product(id):
    form = EditReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        review = Review.query.filter(Review.id == id).first()
        review.rating=form.data['rating']
        review.content=form.data['content']

        db.session.add(review)
        db.session.commit()

        return review.to_dict()

    else:
        return form.errors
