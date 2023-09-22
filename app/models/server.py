from .db import db, environment, SCHEMA, add_prefix_for_prod

class Server(db.Model):
    __tablename__ = "servers"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, default=False)
    owner_id - db.Column(db.Integer, db.ForeignKey('user.id', nullable=False))
