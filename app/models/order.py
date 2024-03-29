from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


orders_products = db.Table(
    "orders_products",
    db.Column("product_id", db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
    db.Column("order_id", db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), primary_key=True)
)
if environment == "production":
    orders_products.schema = SCHEMA



class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    # quantity = db.Column(db.Integer(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="orders")
    products = db.relationship("Product", secondary=orders_products, back_populates="orders")




    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            # 'product_id': self.product_id,
            # 'quantity': self.quantity
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
