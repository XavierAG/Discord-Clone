from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://Biscord.onrender.com',
        'https://Biscord.onrender.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

def handle_add_server(data):
    socketio.emit("add_server", data)

def handle_edit_server(data):
    socketio.emit("edit_server", data)


def handle_delete_server(data):
    socketio.emit("delete_server", data)


def handle_add_channel(data):
    socketio.emit("add_channel", data)


def handle_edit_channel(data):
    socketio.emit("edit_channel", data)


def handle_delete_channel(data):
    socketio.emit("delete_channel", data)

@socketio.on("chat")
def handle_add_message(data):
    emit("chat", data, broadcast=True)


def handle_edit_message(data, channel_id):
    socketio.emit("edit_message", {"data": data, "channel_id": channel_id})


def handle_delete_message(data, channel_id):
    socketio.emit("delete_message", {"data": data, "channel_id": channel_id})
