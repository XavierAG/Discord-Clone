from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length


class ServerForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired(), Length(max=100)])
  image_url = StringField('Image Url')
  private = BooleanField('Private')
