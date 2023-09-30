from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)

#User Routes
@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/friends')
@login_required
def friends(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    friends = user.add.all()
    # user.add gets persons friends
    # user.added gets people who have added that user
    # if user.add = user.added = friends
    return {'friends': [friend.to_dict() for friend in friends]}


@user_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    user_id = current_user.id
    user = User.query.get(user_id)

    if not user:
        return jsonify(message="User not found"), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify(message="User deleted successfully"), 200
