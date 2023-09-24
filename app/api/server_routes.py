from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request
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
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_server = Server(
            name=form.data["name"],
            image_url=form.data["image_url"],
            private=form.data["private"],
            owner_id=current_user.id,
        )
        db.session.add(new_server)
        db.session.commit()

        # Emit a Socket Event to notify clients about the new server
        handle_add_server(new_server.to_dict())

        return new_server.to_dict()
    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {'errors': errors}, 400

# Edit server
@server_routes.route('/<int:server_id>', methods=['PUT'])
@login_required
def edit_server(server_id):
    """
    Update a server by its ID by an authorized user
    """
    print('SERVER ID:', server_id)
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    server = Server.query.get(server_id)

    if server is None:
        return {'errors': 'Server not found'}, 404

    if form.validate_on_submit() and server.owner_id == current_user.id:
        server.name = form.data['name']
        server.image_url = form.data['image_url']
        server.private = form.data['private']
        db.session.commit()

        # Emit a Socket Event to notify clients about the server edit
        handle_edit_server(server.to_dict())

        return server.to_dict()
    elif server.owner_id != current_user.id:
        return {'message': 'User unauthorized to edit server'}, 400
    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {'errors': errors}, 400


# Delete a server
@server_routes.route('/<int:server_id>', methods=['DELETE'])
@login_required
def delete_server(server_id):
    """
    Delete a server by its ID by an authorized user
    """
    server = Server.query.get(server_id)
    if not server:
        return { "message": "Server does not exist" }, 400
    if server.owner_id == current_user.id:
        handle_delete_server(server.to_dict())
        db.session.delete(server)
        db.session.commit()
        return { "message": "Server successfully deleted" }
    elif server.owner_id != current_user.id:
        return { "message": "Must server owner to delete" }, 400
    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {'errors': errors}, 400
