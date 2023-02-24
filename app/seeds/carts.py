from app.models import db, environment, SCHEMA
from app.models.cart import Cart


# Adds a demo user, you can add other users here if you want
def seed_carts():
    cart1 = Cart(
        user_id=1)
    cart2 = Cart(
        user_id=2)
    cart3 = Cart(
        user_id=3)

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the carts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_carts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute('TRUNCATE carts RESTART IDENTITY CASCADE;')

    db.session.commit()
