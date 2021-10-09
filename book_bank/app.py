import os
import logging
from flask import Flask, jsonify, request, Blueprint




def create_app():

    app = Flask(__name__)
    uri = os.environ['SQLALCHEMY_DATABASE_URI']
    app.config["JWT_SECRET_KEY"]= b'ls\x16\xf2\xab]\xe9o`\xfa\x03m\xc1\x984\xcd'
    app.config['SQLALCHEMY_DATABASE_URI'] = uri
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]

    from routes import routes
    app.register_blueprint(routes, url_prefix="/api")


    #config variables go here
    from extensions import db, ma, jwt, bcrypt, migrate, cors

    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, supports_credentials=True, resources={r'/api/*': {"origins": "*"}})

    with app.app_context():
        db.create_all()




    return app

app = create_app()
app.run(host="0.0.0.0")
