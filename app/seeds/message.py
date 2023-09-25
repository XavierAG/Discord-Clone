from app.models import db, Message
from sqlalchemy.sql import text

#Seeder for Messages
def seed_messages():
    message1= Message(
        content= 'I am the best Comment you will ever see',
        channel_id = 1,
        owner_id = 2
    )
    message2= Message(
        content= 'I am the best Person to write stuff in here',
        channel_id = 1,
        owner_id = 2
    )
    message3= Message(
        content= 'Jimmy is a G',
        channel_id = 1,
        owner_id = 2
    )
    message4= Message(
        content= 'Brad please send me your Barbers number!',
        channel_id = 1,
        owner_id = 2
    )
    message5= Message(
        content= 'David please help Brad grow some hair!',
        channel_id = 1,
        owner_id = 2
    )

    all_messages = [message1, message2, message3, message4, message5]
    add_messages = [db.session.add(message) for message in all_messages]
    db.session.commit()

def undo_messages():
    db.session.execute(text('DELETE FROM messages'))
    db.session.commit()
