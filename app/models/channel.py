from .db import db, environment, SCHEMA, add_prefix_for_prod


class Channel(db.Model):
    __tablename__='channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
    private = db.Column(db.Boolean, default=False)

    servers= db.relationship('Server', back_populates='channels')
    messages= db.relationship('Message', back_populates='channels', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name':self.name,
            # 'messages': {},
            # 'servers': {},
            'private':self.private,
            'server_id': self.server_id
        }
