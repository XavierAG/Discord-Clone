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
    image_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_B8S20od2MNZhhSdL7yGvET0R6j5C2UHtBBDonAZOILc3nx_Icc5yOGLroKLIGd1ZhPA&usqp=CAU",
    private= False,
    owner_id = 3
  )
  server5= Server(
    name= 'best_server',
    image_url= "https://preview.redd.it/i-let-my-friend-borrow-my-tech-deck-and-he-sub-consciously-v0-eg0o5o6jlkb81.jpg?width=640&crop=smart&auto=webp&s=3857e5f409df03d9f40821bf1517fd69bfa33d1f",
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
