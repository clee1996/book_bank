from flask import Blueprint, request, jsonify
from extensions import bcrypt, db
from dblayout import Book, Person, BookSchema, PersonSchema
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
    jwt_required,
    get_jwt_identity
)



routes = Blueprint("routes", __name__)


@routes.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)


@routes.route("/login", methods=["POST"])
def create_token():
    """route to login and create token"""

    content = request.get_json(force=True)
    username = content['username']
    password = content['password']
    user = Person.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"msg": "Wrong Username",
                        "login": False}), 401
    else:
        user_schema = PersonSchema()
        user_serialized = user_schema.dump(user)
        pass_hash = user.password
        result = bcrypt.check_password_hash(pass_hash, password)
        if result is False:
            return jsonify({"msg": "Wrong Password",
                            "login": False}), 401
        else:

            access_token = create_access_token(identity=username)
            refresh_token = create_refresh_token(identity=username)
            resp = jsonify({"login": True,
                            "user": user_serialized})
            set_access_cookies(resp, access_token)
            set_refresh_cookies(resp, refresh_token)
            return resp, 200


@routes.route('/register', methods=['POST'])
def register():
    content = request.get_json(force=True)
    username = content['username']
    password = content['password']
    user = Person.query.filter_by(username=username).first()
    if user is None:
        pw_hash = bcrypt.generate_password_hash(password).decode('utf8')
        user = Person(username=username, password=pw_hash, authenticated=True)
        db.session.add(user)
        db.session.commit()
        person_schema = PersonSchema()
        output = person_schema.dump(user)
        return jsonify(output), 201


    else:
        return jsonify({"msg": "username is taken"}), 409


@routes.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({"logout": True})
    unset_jwt_cookies(resp)
    return resp, 200



@routes.route('/books')
@jwt_required()
def index():
    book_schema = BookSchema()
    books = Book.query.all()
    output = book_schema.dump(books, many=True)
    return jsonify({"books":output})


@routes.route('/books/<id>')
@jwt_required()
def bookInfo(id):
    books_schema = BookSchema()
    book = Book.query.get(id)
    output = books_schema.dump(book)
    return jsonify(output)



@routes.route('/books/<id>', methods=['DELETE'])
@jwt_required()
def bookDelete(id):
    books_schema = BookSchema()
    book = Book.query.get(id)
    output = books_schema.dump(book)
    db.session.delete(book)
    db.session.commit()
    return jsonify(output)


@routes.route('/books/<id>', methods=['PATCH'])
@jwt_required()
def bookPatch(id):
    content = request.get_json(force=True)
    author = content["author"]
    title = content["title"]
    synopsis = content["synopsis"]
    books_schema = BookSchema()
    book = Book.query.get(id)
    book.author = author
    book.title = title
    book.synopsis = synopsis
    output = books_schema.dump(book)
    db.session.commit()
    return jsonify(output)


@routes.route('/personbooks/<id>')
@jwt_required()
def ownBooks(id):
    book_schema = BookSchema()
    person = Person.query.get(id)
    arr_of_books = person.books
    output = book_schema.dump(arr_of_books, many=True)
    return jsonify({"books":output})



@routes.route('/bookspost', methods=['POST'])
@jwt_required()
def bookPost():
    content = request.get_json(force=True)
    author = content["author"]
    title = content['title']
    synopsis = content['synopsis']
    person = content['person_id']
    book = Book(author=author, title=title, synopsis=synopsis, person_id=person)
    books_schema = BookSchema()
    output = books_schema.dump(book)
    db.session.add(book)
    db.session.commit()

    return jsonify(output), 200

