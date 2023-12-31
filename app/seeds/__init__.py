from flask.cli import AppGroup
from .users import seed_users, undo_users
from .server import seed_servers, undo_servers
from .channel import seed_channels, undo_channels
from .message import seed_messages, undo_messages
from .friends import seed_friends, undo_friends
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_messages()
        undo_channels()
        undo_servers()
        undo_friends()
        undo_users()
    seed_users()
    seed_friends()
    seed_servers()
    seed_channels()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_friends()
    undo_users()
    undo_servers()
    undo_channels()
    undo_messages()

    # Add other undo functions here
