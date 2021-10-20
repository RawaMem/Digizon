"""empty message

Revision ID: 863d0cd90682
Revises: 4fa21bb73d8c
Create Date: 2021-10-20 14:08:24.923494

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '863d0cd90682'
down_revision = '4fa21bb73d8c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('orders_products',
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('product_id', 'order_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('orders_products')
    # ### end Alembic commands ###