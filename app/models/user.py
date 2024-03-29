from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    balance = db.Column(db.Integer, default=0)
    hashed_password = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    orders = db.relationship('Order', back_populates='user')
    reviews = db.relationship('Review', back_populates='user')
    cart = db.relationship('Cart', uselist=False, back_populates='user')
    products = db.relationship('Product', back_populates='user')
    view_history = db.relationship('ViewHistory', uselist=False, back_populates='user')
    medias = db.relationship('Media', back_populates='user')
    save = db.relationship('Save', uselist=False, back_populates='user')



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'balance': self.balance,
            # 'products': [product.to_dict() for product in self.products],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
