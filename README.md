**1week-project**<br>
## 프로젝트 명<br>
### GADA ( 가다 )<br><br>
---

### 소개<br>
#### * 추천할만한 여행지나 맛집 같은 곳 후기를 등록하고 다른 유저들이 댓글을 남길 수 있는 사이트.<br><br>
[시연 영상] (https://www.youtube.com/watch?v=COXfOHqGyew)

### 와이어 프레임<br>
##### - 로그인 & 회원가입 페이지 -!<br>
![img1 daumcdn](https://user-images.githubusercontent.com/80199125/178869078-8ef8b849-00f7-499d-b993-517257a60164.png)<br><br>

##### - 글 목록 페이지(메인 페이지) & 게시물 업로드  - <br>
![img1 daumcdn](https://user-images.githubusercontent.com/80199125/178867183-f092b616-4e43-44bc-be04-1f473c2ec4fd.png)<br><br>

##### - 게시글 카드 클릭시 보여지는 상세 페이지 - <br>
![img1 daumcdn](https://user-images.githubusercontent.com/80199125/178867203-da8d921e-1513-4554-b9a5-ef65fc29dbe9.png)<br><br>

#### 개발한 기능들<br>
로그인, 검색, 좋아요, 좋아요 리스트 조회, 상세정보 페이지, 댓글 기능, 

#### public github repo 주소<br>
https://github.com/BackDev19/1week-miniproject<br><br>

### 사용스킬
<img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/>
<img alt="CSS3" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/>
<img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/>
<img alt="Jinja" src ="https://img.shields.io/badge/Jinja2-B41717.svg?&style=for-the-badge&logo=Jinja&logoColor=white"/>
<img alt="Python" src ="https://img.shields.io/badge/Python-3776AB.svg?&style=for-the-badge&logo=Python&logoColor=white"/>
<img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-47A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=white"/>

```
사용된 패키지들
flask, pymongo, pyjwt 1.7.1, jinja2, requests
```

---
### 실행 화면

#### 초기 화면
<img width="959" alt="로딩화면" src="https://user-images.githubusercontent.com/80199125/178905763-422d245e-3fad-4cd3-92e7-a4efa493a501.png">
<img width="950" alt="회원가입" src="https://user-images.githubusercontent.com/80199125/178905734-60c48aeb-53ac-4e08-b934-5cdf25be56b0.PNG">
<img width="951" alt="로그인화면" src="https://user-images.githubusercontent.com/80199125/178905748-a7458375-32e3-47c4-9506-a78aa00f2871.png">

#### 메인화면
<img width="951" alt="메인1" src="https://user-images.githubusercontent.com/80199125/178905811-d0d2c37c-44b3-410a-8eaa-56f80acb4cd1.PNG">
<img width="952" alt="전체화면" src="https://user-images.githubusercontent.com/80199125/178905832-9de3c94e-9d81-47b1-8d66-b13572eea7c7.PNG">

<img width="949" alt="modal창" src="https://user-images.githubusercontent.com/80199125/178905944-3fa3a595-6c68-45cd-a5a8-e000f5fdb772.PNG">
<img width="950" alt="modal창1" src="https://user-images.githubusercontent.com/80199125/178905952-101a10b9-032e-4ec8-9601-cf34788856dc.PNG">
<img width="950" alt="modal창 검색" src="https://user-images.githubusercontent.com/80199125/178905962-965220ae-971f-49db-8c65-a57a7b812d2a.PNG">
<img width="315" alt="전체세팅" src="https://user-images.githubusercontent.com/80199125/178906048-04be3890-d827-463a-8721-cbf173c48eee.PNG">


#### 좋아요 조회 기능과 검색 기능
<img width="373" alt="likelist" src="https://user-images.githubusercontent.com/80199125/178905980-93ab47ba-4b9c-4926-8162-ad57d765c83f.PNG">
<img width="951" alt="검색결과" src="https://user-images.githubusercontent.com/80199125/178906161-62808cd6-7622-4437-878d-dc3b75ba5986.PNG">

#### 상세정보 페이지, 삭제 기능
<img width="951" alt="삭제기능 + 상세정보페이지" src="https://user-images.githubusercontent.com/80199125/178905989-ce380543-99ac-4d0c-9b87-883caf90e8e7.PNG">


### 트러블 슈팅<br>

1. 이미지 업로드 과정에서 데이터베이스에 이미지를 그대로 저장하지 않고, 서버에 저장 후
이미지의 주소값을 데이터베이스에 저장한 후, 불러오게 하였습니다.

2. 검색창에서 하나의 데이터만 저장되지 않고, 여러개의 데이터를 불러오게 함과 동시에,
아무런 데이터를 주지 않으면 정규표현식 오류가 뜨는 부분을 기존의 값을 ""값으로 변경함으로써
오류페이지로 이동하던 문제를 해결하였습니다.

3. 삭제 기능 추가 이후 발견된 문제. 중간의 게시글을 삭제한 후 다시 게시글을 생성하면
게시글의 고유값이 중복되는 문제가 발생하였음.
카드의 index를 mongoDB에서 자체적으로 할당하는 고유ID값을 이용, ndex값이 서로 겹치지않게
하였습니다.



