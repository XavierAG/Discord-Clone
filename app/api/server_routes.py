from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.socket import handle_add_channel, handle_edit_server, handle_delete_server, handle_add_server
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
    public_servers = Server.query.filter(Server.private == False).all()
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
        #Emiting Data to the Server from Client when a new Server is made by a Client
        handle_add_server(new_server.to_dict())
        return 'Server created successfully'

    if form.errors:
        print(form.errors)
        return { "message": "errors"}

    return { "message": "Server created!"}


#Editing Serverss
@server_routes.route('/<int:server_id>', methods=['PUT'])
@login_required
def edit_server(server_id):
    form = ServerForm()

    server = Server.query.get(server_id)

    if form.validate_on_submit() and server.owner_id == current_user.id:
        server.name = form.data['name'],
        server.image_url = form.data['image_url'],
        server.private = form.data['private']
        db.session.commit()

        #Emit a Socket Event to notify clients about the Server Edit
        handle_edit_server(server.to_dict())

        return server.to_dict()
    if form.errors:
        print(form.errors)
        return{'message': 'errors'}
