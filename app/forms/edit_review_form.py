from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class EditReviewForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    submit = SubmitField('submit')
