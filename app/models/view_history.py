from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


products_histories = db.Table(
    "products_histories",
    db.Column("product_id", db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
    db.Column("view_history_id", db.Integer, db.ForeignKey(add_prefix_for_prod("view_histories.id")), primary_key=True)
)



class ViewHistory(db.Model):
    __tablename__ = 'view_histories'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', uselist=False, back_populates='view_history')
    products = db.relationship("Product", secondary=products_histories, back_populates="view_histories")






    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
