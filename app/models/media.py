from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Media(db.Model):
    __tablename__ = 'medias'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    url = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())


    user = db.relationship('User', back_populates='medias')
    product = db.relationship("Product", back_populates="medias")






    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'url': self.url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
