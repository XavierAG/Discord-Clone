from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Server, User, db
from app.forms import ServerForm, ChannelForm


server_routes = Blueprint('servers', __name__)


# Get all public servers
@server_routes.route('/', methods=['GET'])
@login_required
def get_all_servers():
    """
    Query a list of all servers not set to private by an authorized user
    """
    public_servers = Server.query.filter(Server.private== False).all()
    return {'servers': [server.to_dict() for server in public_servers]}


# Create server
@server_routes.route('/', methods=['POST'])
@login_required
def create_server():
    form = ServerForm()
    if form.validate_on_submit():
        new_server= Server(
            name= form.data["name"],
            image_url= form.data["image_url"],
            private= form.data["private"],
            owner_id= current_user.id,
        )
        db.session.add(new_server)
        db.session.commit()

    if form.errors:
        print(form.errors)
        return { "message": "errors"}

    return { "message": "Server created!"}
