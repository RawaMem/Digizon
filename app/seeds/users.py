from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', balance=0, password='password')
    user2 = User(
        first_name='Marnie', last_name='User', username='marnie', email='marnie@aa.io', balance=0, password='password')
    user3 = User(
        first_name='Bobbie', last_name='User', username='bobbie', email='bobbie@aa.io', balance=0, password='password')

    db.session.add(demo)
    db.session.add(user2)
    db.session.add(user3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
