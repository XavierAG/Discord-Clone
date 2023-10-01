from .db import db, environment, SCHEMA, add_prefix_for_prod

# Define the association table for the many-to-many relationship

friends = db.Table(
    'friends',

    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('friend_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
)

if environment == "production":
    friends.schema = SCHEMA
