from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Server, Channel ,User, db
from app.forms import ChannelForm
from app.socket import handle_add_channel, handle_delete_channel, handle_edit_channel


channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/<int:channel_id>', methods=['PUT'])
@login_required
def edit_channel(channel_id):
    """
    Updates the record of a channel by channel id by an authorized user
    """
