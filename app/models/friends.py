from .db import db

# Define the association table for the many-to-many relationship
friends = db.Table(
    'friends',
    db.Column('friend_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('the_friend_id', db.Integer, db.ForeignKey('users.id'))
)
