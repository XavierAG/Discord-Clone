from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Server, User, db
from app.forms import ServerForm, ChannelForm

server_routes = Blueprint('servers', __name__)

#Get All Servers route
@server_routes.route('/', methods=['GET'])
@login_required
def get_all_servers():
    """
    Query a list of all servers not set to private by an authorized user
    """
    public_servers = Server.query.filter(Server.private== False).all()
    return {'servers': [server.to_dict() for server in public_servers]}

# @server_routes.route('/', methods=['POST'])
# @login_required
# def create_server():
#     form = ServerForm()
