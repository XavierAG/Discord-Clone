from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_friends():

    demo1 = User.query.filter_by(username='demo1').first()
    demo2 = User.query.filter_by(username='demo2').first()
    bobbie = User.query.filter_by(username='bobbie').first()
    jack =   User.query.filter_by(username='jack').first()
    chris =   User.query.filter_by(username='chris').first()
    jimmy =   User.query.filter_by(username='jimmy').first()
    xavier =   User.query.filter_by(username='xavier').first()

    # Establish friendships
    demo1.add.append(demo2)
    demo1.add.append(bobbie)
    demo1.add.append(jack)
    demo1.add.append(chris)



    # Commit the changes
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))


    db.session.commit()
