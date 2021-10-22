from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class NewProductForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    url = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    stock_quantity = IntegerField('stock_quantity', validators=[DataRequired()])
    submit = SubmitField('submit')
