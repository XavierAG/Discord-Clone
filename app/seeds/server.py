from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

def seed_servers():

  server1= Server(
    name= 'cool_server',
    image_url= "https://discord-x.s3.us-east-2.amazonaws.com/1baafb488d4d4863b8da2060a92085ef.gif",
    private= False,
    owner_id = 1
  )
  server2= Server(
    name= 'app_server',
    image_url= "https://discord-x.s3.us-east-2.amazonaws.com/1e5e5824b65941e5bc7e1397d9ce2bf0.jpg",
    private= False,
    owner_id = 2
  )
  server3= Server(
    name= 'game_server',
    image_url= "https://discord-x.s3.us-east-2.amazonaws.com/4a6249dbead644f6b4f187d67be07d05.gif",
    private= False,
    owner_id = 2
  )
  server4= Server(
    name= 'movie_server',
    image_url= "https://www.tinkeringmonkey.com/wp-content/uploads/2020/09/app-academy-closeup2-scaled.jpg",
    private= False,
    owner_id = 3
  )
  server5= Server(
    name= 'best_server',
    image_url= "https://www.tinkeringmonkey.com/wp-content/uploads/2020/09/app-academy-closeup2-scaled.jpg",
    private= False,
    owner_id = 3
  )

  all_servers = [server1, server2, server3, server4, server5]
  add_servers = [db.session.add(server) for server in all_servers]
  db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
