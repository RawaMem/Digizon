from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


products_carts = db.Table(
    "products_carts",
    db.Column("product_id", db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
    db.Column("cart_id", db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True)
)




class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', uselist=False, back_populates='cart')
    products = db.relationship("Product", secondary=products_carts, back_populates="carts")






    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'productsObjForState': {product.id:product.to_dict() for product in self.products},
            'products': [product.to_dict() for product in self.products],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
