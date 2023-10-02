from .db import db, environment, SCHEMA, add_prefix_for_prod


class Message(db.Model):
    __tablename__= 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    channels = db.relationship('Channel', back_populates='messages')
    users = db.relationship('User', back_populates= 'messages')


    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "channel_id": self.channel_id,
            "owner_id": self.owner_id,
            "user": {
            "id": self.users.id,  # Assuming there's a one-to-one relationship between messages and users
            "username": self.users.username  # Replace with the actual attribute name of the user's username
        }
        }
