from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(message='Field cannot be empty'), Length(min=1, max=100, message='First name must be between 2 and 100 characters')])
    last_name = StringField('last_name', validators=[DataRequired(message='Field cannot be empty'), Length(min=1, max=100, message='Last name must be between 2 and 100 characters')])
    username = StringField('username', validators=[DataRequired(message='Field cannot be empty'), Length(min=3, max=40, message='User name must be between 3 and 40 characters'), username_exists])
    email = StringField('email', validators=[DataRequired(message='Field cannot be empty'), Length(min=5, max=255, message='Email must be between 5 and 255 characters'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Field cannot be empty')])
