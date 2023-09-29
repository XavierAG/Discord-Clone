from .db import db, environment, SCHEMA, add_prefix_for_prod
from .member import members

class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, default=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    users = db.relationship('User', back_populates='servers')
    channels =  db.relationship('Channel', back_populates='servers', cascade="all, delete")

    members = db.relationship("Server", secondary=members, back_populates="servers")

    # members = db.relationship('User', secondary="members", back_populates="servers")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'private': self.private,
            'owner_id': self.owner_id,
            'members': [user.to_dict() for user in self.members]
        }
