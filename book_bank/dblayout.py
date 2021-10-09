#from flask import Flask, Blueprint
from extensions import db, ma
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow


### Models ###
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(80), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    synopsis = db.Column(db.String(180), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))


class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    authenticated = db.Column(db.Boolean, default=False)
    books = db.relationship('Book', backref='person', lazy=True)

    def is_active(self):
        return True

    def get_id(self):
        return self.username

    def is_authenticated(self):
        return self.authenticated

    def is_anonymous(self):
        return False


### Schemas  ###
class BookSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Book
    id = ma.auto_field()
    author = ma.auto_field()
    title = ma.auto_field()
    synopsis = ma.auto_field()
    person_id = ma.auto_field()

class PersonSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Person
    id = ma.auto_field()
    username = ma.auto_field()
    password = ma.auto_field()
    books = ma.auto_field()
