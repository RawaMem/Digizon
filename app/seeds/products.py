from app.models import db
from app.models import product
from app.models.product import Product
from app.models.media import Media


def seed_products():
    product1 = Product(
        user_id=1, name='Xbox Series X', description='newest and most powerful Xbox console', price=499.99, stock_quantity=10)
    product2 = Product(
        user_id=2, name='Playstation 5', description='newest and most powerful Playstation console', price=399.99, stock_quantity=9)
    product3 = Product(
        user_id=3, name='Nintendo Switch', description='newest and most powerful Nintendo console', price=299.99, stock_quantity=8)
    media1 = Media(
        user_id=1, product_id=1, url='https://cdn.vox-cdn.com/thumbor/fR3vjUYAmKF0DjuXEDOg2JNb5l8=/0x0:2040x1360/1820x1213/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/69067203/vpavic_201103_4275_0163.0.jpg')
    media2 = Media(
        user_id=1, product_id=2, url='https://api.time.com/wp-content/uploads/2020/11/best-inventions-of-2020-Playstation-5-4.jpg?w=1600&quality=70')
    media3 = Media(
        user_id=1, product_id=3, url='https://thenerdstash.com/wp-content/uploads/2019/05/nintendo-switch-clean.jpg')

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    product1.medias.append(media1)
    product2.medias.append(media2)
    product3.medias.append(media3)

    db.session.commit()


def undo_products():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
