from app.models import db, Member, environment, SCHEMA
from sqlalchemy.sql import text


def seed_members():
    member1 = Member(
        user_id=1, server_id=1
        )
    member2 = Member(
         user_id=1, server_id=1
        )
    member3 = Member(
        user_id=1, server_id=2
        )
    member4 = Member(
        user_id=2, server_id=2
        )
    member5 = Member(
        user_id=2, server_id=3
        )
    member6 = Member(
        user_id=3, server_id=3
        )

    all_members = [member1, member2, member3, member4, member5, member6]

    add_members = [db.session.add(member) for member in all_members]
    db.session.commit()

def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM Members"))

    db.session.commit()
