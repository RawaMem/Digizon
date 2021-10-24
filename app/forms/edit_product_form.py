from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class EditProductForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    cover_img_url = StringField('cover_img_url', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    stock_quantity = IntegerField('stock_quantity', validators=[DataRequired()])
    submit = SubmitField('Submit')
