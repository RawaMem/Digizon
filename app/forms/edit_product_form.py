from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import URL, DataRequired, Length, NumberRange


class EditProductForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired(message='Field cannot be empty')])
    user_id = IntegerField('user_id', validators=[DataRequired(message='Field cannot be empty')])
    name = StringField('name', validators=[DataRequired(message='Field cannot be empty')])
    cover_img_url = StringField('cover_img_url', validators=[DataRequired(message='Field cannot be empty'), URL(require_tld=True, message='Must be URL with a .tld suffix domain'), Length(min=10, max=1000, message='The description must be between 10 and 1000 characters.')])
    description = StringField('description', validators=[DataRequired(message='Field cannot be empty'), Length(min=10, max=100, message='The description must be between 10 and 100 characters.')])
    price = IntegerField('price', validators=[DataRequired(message='Field cannot be empty'), NumberRange(min=1, max=10000, message='Price must range between 1 and 10,000.')])
    stock_quantity = IntegerField('stock_quantity', validators=[DataRequired(message='Field cannot be empty'), NumberRange(min=1, max=100, message='Quantity must range between 1 and 100')])
    submit = SubmitField('submit')
