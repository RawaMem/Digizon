from .db import db
from datetime import datetime


products_carts = db.Table(
    "products_carts",
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True),
    db.Column("cart_id", db.Integer, db.ForeignKey("carts.id"), primary_key=True)
)




class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', uselist=False, back_populates='cart')
    products = db.relationship("Product", secondary=products_carts, back_populates="carts")





    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'products': [product.to_dict() for product in self.products],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
