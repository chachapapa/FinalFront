# Fitness App Project

## 제작 기간 / 참여 인원
- 2023.05.18(목) ~ 2023.05.26(금)
- 2인 프로젝트

## 사용 기술 스택

 ### front-end
 - Vue
 - Vuetify
 
 ### back-end
 - SpringBoot
 - MySQL
 - Amazon Web Service 
 

 
## ERD/목업
- Figma
![image](https://github.com/chachapapa/VueProject_Front/assets/119780428/cd846b5f-3f4f-401c-b514-b61ef3e1896e)


## 핵심 기능

<details>
<summary>1. 운동 게시글과 연동한 회원의 스트릭, 몸무게, 운동능력 수치 변화 관리.</summary>

- 게시글 업로드시 스트릭 업데이트 코드
![streak](https://github.com/chachapapa/VueProject_Front/assets/119780428/52948bb5-d569-46eb-8eb3-337ab4a5a0dc)

  연속된 스트릭을 계산하여 오늘까지 몇일을 운동하였는지 vuex의 state 내에서 수치 변경.
</details>

<details>
<summary>2. 오늘 운동 완료 게시판 내 게시글 열람, 작성, 댓글, 좋아요, 삭제 기능</summary>

- 게시글 get, post  요청
 
![board_get_post](https://github.com/chachapapa/VueProject_Front/assets/119780428/fdc96cb1-2134-4454-b62b-5961eb9867e4)
 
  rest-api 에게 axios 를 통해 get, post 요청을 보내는 코드 사진또한 첨부하여 aws에 저장해 게시글에 등록.
 <hr>

- 게시글 delete 요청, 좋아요 기능
 
![board_delete_like](https://github.com/chachapapa/VueProject_Front/assets/119780428/a4ef0670-0de2-4e41-ba51-ace5b9a7cd8f)
 
  axios delete요청과 좋아요 클릭시 aritcleId와 userId를 넘겨주는 post, delete 요청.
 ```
 vuex 의 state를 통해 isliked변수를 전역변수로 컨트롤하려 했으나 리렌더링이 잘 되지 않는 오류 발생.
 이후 state 가 아닌 클릭시 props로 boolean형태의 데이터를 넘겨주어 해결.  
 ```
</details>

<details>
<summary>3. 운동 영상 검색, 시청, 키워드별 메뉴, 마이 메뉴</summary>
 
- 유튜브 api를 활용해 특정 키워드 영상 가져오기
 
![youtube_get](https://github.com/chachapapa/VueProject_Front/assets/119780428/50132b81-dedf-4ede-83f1-b27cdf790cea)

  .env.local파일을 통해 api가 git에 업로드 되는 것을 방지. 환경변수로 설정해준 뒤, axios 요청을 통해 영상 가져오기.
<hr>

 - 직접 메뉴를 추가, 제거할 수 있도록 커스터마이징 가능한 사이드메뉴 배치.
</details>


