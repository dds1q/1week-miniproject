from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
import os
app = Flask(__name__)
# import requests
# from bs4 import BeautifulSoup

from pymongo import MongoClient
# 인권
client = MongoClient('mongodb+srv://test:sparta@cluster0.aaaog.mongodb.net/Cluster0?retryWrites=true&w=majority')
# 조현우님
# client = MongoClient('mongodb+srv://test:sparta@cluster0.aaaog.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/about/<name>")
def admin(name):
   return 'About %s' %name

@app.route("/login")
def login():
   return render_template('login.html')

@app.route('/about/<int:user_id>')
def get_message(user_id):
   return 'Your ID is %d' % user_id

@app.route("/submit", methods=["POST"])
def web_write_post():
    title_receive = request.form['title_give']
    img_receive = request.form['img_give']
    comment_receive = request.form['comment_give']
    star_receive = request.form['star_give']
    desc_receive = request.form['desc_give']
    mytime = datetime.now().strftime('%Y-%m-%d %H:%M')

    doc = {
        'title' : title_receive,
        'img' : img_receive,
        'comment' : comment_receive,
        'star' : star_receive,
        'desc' : desc_receive,
        'time' : mytime
    }
    db.App.insert_one(doc)

    return jsonify({'msg': '등록완료'})

@app.route("/submit", methods=["GET"])
def web_write_get():
    write_list = list(db.App.find({}, {'_id': False}))
    return jsonify({'orders': write_list})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)