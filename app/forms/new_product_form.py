from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class NewProductForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    name = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    stock_quantity = IntegerField('Stock Quantity', validators=[DataRequired()])
    submit = SubmitField('Submit')
