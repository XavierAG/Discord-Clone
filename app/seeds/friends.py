from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_friends():
    # Assuming you have already seeded users using seed_users
    demo = User.query.filter_by(username='Demo').first()
    marnie = User.query.filter_by(username='marnie').first()
    bobbie = User.query.filter_by(username='bobbie').first()

    # Establish friendships
    demo.add.append(marnie)
    demo.add.append(bobbie)
    marnie.add.append(demo)
    bobbie.add.append(demo)

    # Commit the changes
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))


    db.session.commit()
