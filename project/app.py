from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.q2wxzlf.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    App_list = list(db.App.find({}, {'_id': False}))
    id = '이동규'
    return render_template('index.html', App_list = App_list , id = id )

@app.route('/detail', methods=["GET"])
def home1():
    id = '이동규'
    num_receive = int(request.args.get("num_give"))
    board = db.App.find_one({'num':num_receive})
    comment_list = list(db.comments.find({'num':num_receive},{'_id': False}) )

    like_count= db.likes.count_documents({"num": num_receive})
    chkLike = bool(db.likes.find_one({"num": num_receive,"username":id }))
    return render_template('index_detail.html',comment_list = comment_list , board = board
                           , id = id , like_count = like_count , chkLike = chkLike )

@app.route("/save-comment", methods=["POST"])
def comment_post():
    nickname_receive = request.form['nickname_give']
    comment_receive = request.form['comment_give']
    num_receive = request.form['num_give']
    doc = {
        'nickname':nickname_receive,
        'comment': comment_receive,
        'num':int(num_receive)
    }
    db.comments.insert_one( doc )
    return jsonify({'msg':'저장 완료!'})

# 코멘트받아오기
@app.route("/all-comment", methods=["GET"])
def comment_get():

    comment_list = list(db.comments.find({},{'_id':False}))

    return jsonify({'comment_list':comment_list})

# 포스트작성
@app.route("/submit", methods=["POST"])
def web_write_post():
    title_receive = request.form['title_give']
    img_receive = request.form['img_give']
    comment_receive = request.form['comment_give']
    star_receive = request.form['star_give']
    desc_receive = request.form['desc_give']

    count = len(list(db.App.find({}, {'_id': False}))) + 1

    doc = {
        'num' : count,
        'title' : title_receive,
        'img' : img_receive,
        'comment' : comment_receive,
        'star':'⭐'* int(star_receive),
        'desc':desc_receive
    }
    db.App.insert_one(doc)

    return jsonify({'msg': '등록완료'})

@app.route("/submit", methods=["GET"])
def web_write_get():
    write_list = list(db.App.find({}, {'_id': False}))
    return jsonify({'orders': write_list})

@app.route('/update_like', methods=['POST'])
def update_like():
    # 사용자 이름
    username = '이동규'
    # 게시글 고유번호
    num_receive = int(request.form["num_give"])
    # 명령( 좋아요 등록할지 취소할지 )
    action_receive = request.form["action_give"]
    doc = {
        "num": num_receive,
        "username": username
    }
    if action_receive == "like":
        db.likes.insert_one(doc)
    else:
        db.likes.delete_one(doc)

    # action 이후 좋아요 개수를 구한다
    count = db.likes.count_documents({"num": num_receive })

    return jsonify({"result": "success", 'msg': 'updated', "count": count})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)