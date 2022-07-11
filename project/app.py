from flask import Flask, render_template, request, jsonify
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

    doc = {
        'url' : url_receive,
        'star' : star_receive,
        'comment' : comment_receive
    }

    db.travel.insert_one(doc)
    return jsonify({'msg':'저장 완료!'})


#파일 업로드 처리
@app.route('/fileUpload', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      print(f.filename)
      #저장할 경로 + 파일명
      f.save("./static/images" + secure_filename(f.filename))
      # f.save("./static/1.png")
      return 'uploads 디렉토리 -> 파일 업로드 성공!'

@app.route("/travel", methods=["GET"])
def movie_get():
    travel_list = list(db.travel.find({}, {'_id' : False}))
    return jsonify({'travel': travel_list})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)