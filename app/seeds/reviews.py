from app.models import db
from app.models.review import Review


def seed_reviews():
    review1 = Review(
        user_id=3, product_id=3, content='I love the switch! it so portable!')
    review2 = Review(
        user_id=1, product_id=2, content='I love the console exclusives!')
    review3 = Review(
        user_id=2, product_id=1, content='Game Pass is amazing!')

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the reviews table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
