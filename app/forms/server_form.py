from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired


class ServerForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  image_url = StringField('Image Url')
  private = BooleanField('Private')
