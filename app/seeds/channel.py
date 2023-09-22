from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    channel1 = Channel(name='General', server_id=1),
    channel2 = Channel(name='Announcements', server_id=1),
    channel3 = Channel(name='Off-Topic', server_id=2),
    channel4 = Channel(name='Support', server_id=2),
    channel5 = Channel(name='Development', server_id=3),

    all_channels = [channel1, channel2, 
                   channel3, channel4, 
                   channel5]
    
    add_channel = [db.session.add(channel) for channel in all_channels]
    db.session.commit()
    
def undo_channels():
    db.session.execute(text('DELETE FROM channels'))
    db.session.commit()
