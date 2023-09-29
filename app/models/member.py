from .db import db, environment, SCHEMA, add_prefix_for_prod


members = db.Table(
    "members",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"))
    db.Column("server_id", db.Integer, db.ForeignKey("servers.id"))
)
