from .db import db
from datetime import datetime
from .cart import products_carts
from .view_history import products_histories
from .order import orders_products




class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    cover_img_url = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())


    user = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="product")
    orders = db.relationship("Order", secondary=orders_products, back_populates="products")
    carts = db.relationship("Cart", secondary=products_carts, back_populates="products")
    view_histories = db.relationship("ViewHistory", secondary=products_histories, back_populates="products")
    medias = db.relationship("Media", back_populates="product", cascade="all, delete-orphan")
    save = db.relationship("Save", back_populates="products")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'cover_img_url': self.cover_img_url,
            'price': self.price,
            'stock_quantity': self.stock_quantity,
            'medias': [media.to_dict() for media in self.medias],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
