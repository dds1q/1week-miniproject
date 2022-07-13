window.onload = function () {
    InnerHtml();
}
let fdfdfdtitle = $('.title').val()
console.log(fdfdfdtitle)

function InnerHtml() {
    let cardboxChild = document.querySelector('#cards-box div')
    if (cardboxChild === null) {
        let temp_html = `<h1 class="woring">게시물 없음</h1>`
        $('#cards-box').append(temp_html)
    }
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
    } else if (desc === "") {
        alert('후기를 작성해주세요')
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
