from .db import db, environment, SCHEMA, add_prefix_for_prod

# Define the association table for the many-to-many relationship
if environment == "production":
    __table_args__ = {'schema': SCHEMA}
friends = db.Table(
    'friends',


    db.Column('friend_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('the_friend_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
)
