from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os
app = Flask(__name__)

# import requests
# from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.aaaog.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/travel", methods=["POST"])
def movie_post():
    url_receive = request.form['url_give']
    star_receive = request.form['star_give']
    comment_receive = request.form['comment_give']

    filename = len(list(db.travel.find({},{'_id':False}))) + 1
    doc = {
        'url' : url_receive,
        'star' : star_receive,
        'comment' : comment_receive,
        'filename' : filename
    }

    db.travel.insert_one(doc)
    return jsonify({'msg':'저장 완료!'})

#파일 업로드 처리
@app.route('/fileUpload', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      filename = len(list(db.travel.find({}, {'_id': False}))) + 1

      #저장할 경로 + 파일명
      f.save("./static/images/" + str(filename) + ".png")
      # f.save("./static/1.png")
      return 'uploads 디렉토리 -> 파일 업로드 성공!'
      # return render_template('fileUpload.html')


@app.route("/travel", methods=["GET"])
def movie_get():
    travel_list = list(db.travel.find({}, {'_id' : False}))
    return jsonify({'travel': travel_list})

@app.route("/about/<name>")
def admin(name):
   return 'About %s' %name

@app.route('/about/<int:user_id>')
def get_message(user_id):
   return 'Your ID is %d' % user_id

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)