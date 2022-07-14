window.onload = function(){
    InnerHtml();
}
// 로그아웃
function sign_out() {
    $.removeCookie('mytoken' , {path: '/'});
    alert('로그아웃!')

    window.location.href = '/'
}
/*
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  };
}, true);*/

// 게시물 없을 시 함수
function InnerHtml() {
    let cardboxChild = document.querySelector('#cards-box div')
    if (cardboxChild === null) {
        let temp_html = `<h1 class="woring">게시물 없음</h1>`
        $('#cards-box').append(temp_html)
    }
}

// 이미지 파일 url 변경 함수
function uploadImgPreview() {
    // @breif 업로드 파일 읽기
    let fileInfo = document.getElementById("upImgFile").files[0];

    let reader = new FileReader();
    // @details readAsDataURL( )을 통해 파일을 읽어 들일때 onload가 실행
    reader.onload = function () {
        // @details 파일의 URL을 Base64 형태로 가져온다.
        // document.getElementById("thumbnailImg").style.background = `url(${reader.result})center/cover`;
        document.getElementById("thumbnailImg").src = reader.result
    };
    // @details readAsDataURL( )을 통해 파일의 URL을 읽어온다.
    if (fileInfo) {
        return reader.readAsDataURL(fileInfo);
    }
}

// 글작성 함수
function submit_card() {
    let title = $('.title').val();
    let imgFlie = document.getElementById("thumbnailImg").src
    let imgSrc = $('#thumbnailImg')
    let star = $('#star').val()
    let address = $('#sample2_address').val()
    let comment = $('.comment').val();
    if (title === "") {
        alert('제목을 입력하세요');
        return false;
    } else if (imgSrc.attr('src') == '') {
        alert('이미지를 추가해주세요')
    } else if (star === '-- 선택하기 --') {
        alert('평점을 매겨주세요');
        return false;
    } else if (address === "") {
        alert('주소를 입력하세요')
        return false
    } else if (comment === "") {
        alert('후기를 남겨주세요')
        return false
    } else {
        $.ajax({
            type: 'POST',
            url: '/submit',
            data: {title_give: title, img_give: imgFlie, comment_give: comment, star_give: star, address_give: address},
            success: function (response) {
                alert(response['msg'])
                window.location.reload()
            }
        });
    }
}

//index 부분
        $(window).bind("pageshow",function (event){
            if( event.originalEvent.persisted || (window.performance && window.performance.navigation.type == 2)){
                console.log("BFCahe로부터 복원됨");
                location.reload();
            } else{
                console.log("새로열린 페이지")
            }
        })

        function posting() {

            let url = $('#url').val()
            let star = $('#star').val()
            let comment = $('#comment').val()

            $.ajax({
                type: 'POST',
                url: '/travel',
                data: {url_give: url, star_give: star, comment_give: comment},
                success: function (response) {
                    alert(response['msg'])
                    window.location.reload()
                }
            });
        }

        function open_box() {
            $('#post-box').show()
        }

        function close_box() {
            $('#post-box').hide()
        }



        function uploadImgPreview() {
            // @breif 업로드 파일 읽기
            let fileInfo = document.getElementById("upImgFile").files[0];

            let reader = new FileReader();
            // @details readAsDataURL( )을 통해 파일을 읽어 들일때 onload가 실행
            reader.onload = function () {
                // @details 파일의 URL을 Base64 형태로 가져온다.
                // document.getElementById("thumbnailImg").style.background = `url(${reader.result})center/cover`;
                document.getElementById("thumbnailImg").src = reader.result
            };
            // @details readAsDataURL( )을 통해 파일의 URL을 읽어온다.
            if (fileInfo) {
                return reader.readAsDataURL(fileInfo);
            }
        }

        function findTitle() {
            let search = $('#searchTitle').val()
            if (search == '') {
                alert('내용을 입력해주세요')
                return
            }
            window.location.href=`/search?search_give=${search}`
        }

        function toggle_like(num) {
            console.log(num)
            let $heart = $('#heart'+num )
            let $i_like = $heart.find("i")

            if ( $i_like.hasClass("bi-heart-fill")) {
                $.ajax({
                    type: "POST",
                    url: "/update_like",
                    data: {
                        num_give: num,
                        action_give: "unlike"
                    },
                    success: function (response) {
                        console.log("unlike")
                        $i_like.addClass("bi-heart").removeClass("bi-heart-fill")
                        $('#heart'+num+ ' span').text( response['count'] )
                    }
                })
            } else {
                $.ajax({
                    type: "POST",
                    url: "/update_like",
                    data: {
                        num_give: num,
                        action_give: "like"
                    },
                    success: function (response) {
                        console.log("like")
                        $i_like.addClass("bi-heart-fill").removeClass("bi-heart")
                        $('#heart'+num+ ' span').text( response['count'] )
                    }
                })

            }
        }

//index like 부분
        $(window).bind("pageshow",function (event){
            if( event.originalEvent.persisted || (window.performance && window.performance.navigation.type == 2)){
                console.log("BFCahe로부터 복원됨");
                location.reload();
            } else{
                console.log("새로열린 페이지")
            }
        })


        //위향훈님
        $(document).ready(function () {
            // show_list()
        });

        /*function show_list() {
            $.ajax({
                type: 'GET',
                url: '/submit',
                data: {},
                success: function (response) {
                    let rows = response['orders']
                    for (let i = 0; i < rows.length; i++) {
                        let title = rows[i]['title']
                        let imgUrl = rows[i]['img']
                        let comment = rows[i]['comment']
                        let star_num = rows[i]['star']
                        let desc = rows[i]['desc']
                        let time = rows[i]['time']

                        let star = '⭐'.repeat(star_num)

                        let temp_html = `<div class="col">
                                            <div class="card h-100">
                                                <img src="${imgUrl}" class="card-img-top">
                                                <div class="card-body">
                                                    <h5 class="card-title">${title}</h5>
                                                    <p class="card-text">${desc}</p>
                                                    <p>${star}</p>
                                                    <p class="mycomment">${comment}</p>
                                                    <p class="mycomment">${time}</p>
                                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                                </div>
                                            </div>
                                        </div>
                                        `
                        $('#cards-box').append(temp_html)
                    }
                }
            });
        }*/


        function posting() {

            let url = $('#url').val()
            let star = $('#star').val()
            let comment = $('#comment').val()

            $.ajax({
                type: 'POST',
                url: '/travel',
                data: {url_give: url, star_give: star, comment_give: comment},
                success: function (response) {
                    alert(response['msg'])
                    window.location.reload()
                }
            });
        }

        function open_box() {
            $('#post-box').show()
        }

        function close_box() {
            $('#post-box').hide()
        }



        function uploadImgPreview() {
            // @breif 업로드 파일 읽기
            let fileInfo = document.getElementById("upImgFile").files[0];

            let reader = new FileReader();
            // @details readAsDataURL( )을 통해 파일을 읽어 들일때 onload가 실행
            reader.onload = function () {
                // @details 파일의 URL을 Base64 형태로 가져온다.
                // document.getElementById("thumbnailImg").style.background = `url(${reader.result})center/cover`;
                document.getElementById("thumbnailImg").src = reader.result
            };
            // @details readAsDataURL( )을 통해 파일의 URL을 읽어온다.
            if (fileInfo) {
                return reader.readAsDataURL(fileInfo);
            }
        }

        /*function submit_card() {

            let title = $('.title').val();
            let imgFlie = document.getElementById("thumbnailImg").src
            let star = $('#star').val()
            let desc = $('#desc').val()
            let url = $('#url').val()

            let comment = $('.comment').val();
            $.ajax({
                type: 'POST',
                url: '/submit',
                data: {title_give: title, img_give: imgFlie, comment_give: comment, star_give: star, desc_give: desc, url_give: url},
                success: function (response) {
                    alert(response['msg'])
                    window.location.reload()
                }
            });
        }*/

        /*function logout(){

            $.removeCookie('mytoken', {path: '/'});
            alert('로그아웃!')
            window.location.href='/'

            /!*function sign_out() {
                $.removeCookie('mytoken', {path: '/'});
                alert('로그아웃!')
            }*!/
        }*/

        function findTitle() {
            alert('httpasdfasfd')
            let search = $('#searchTitle').val()
            if (search == '') {
                alert('내용을 입력해주세요')
                return
            }
            window.location.href=`/main/search_give=${search}`
            if ('{{ msg }}' != null) {
                alert('{{ msg }}');
                return;
            }

            $('#cards-box').empty()



        }

        function toggle_like(num) {
            console.log(num)
            let $heart = $('#heart'+num )
            let $i_like = $heart.find("i")

            if ( $i_like.hasClass("bi-heart-fill")) {
                $.ajax({
                    type: "POST",
                    url: "/update_like",
                    data: {
                        num_give: num,
                        action_give: "unlike"
                    },
                    success: function (response) {
                        console.log("unlike")
                        $i_like.addClass("bi-heart").removeClass("bi-heart-fill")
                        $('#heart'+num+ ' span').text( response['count'] )
                    }
                })
            } else {
                $.ajax({
                    type: "POST",
                    url: "/update_like",
                    data: {
                        num_give: num,
                        action_give: "like"
                    },
                    success: function (response) {
                        console.log("like")
                        $i_like.addClass("bi-heart-fill").removeClass("bi-heart")
                        $('#heart'+num+ ' span').text( response['count'] )
                    }
                })

            }
        }
