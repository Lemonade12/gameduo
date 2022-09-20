# GAMEDUO

보스레이드 PVE 컨텐츠 관련 서비스
<br><br>

## 📌 서비스 개요

- 본 서비스는 보스레이드 PVE 컨텐츠 관련 서비스 입니다.

## 📌 요구사항 분석 및 구현



### 1. 유저생성 CREATE
- 중복되지 않는 userId를 생성합니다.

### 2. 유저조회 READ
- 해당 유저의 보스레이드 총 점수와 보스레이드 참여기록을 알 수 있습니다.

### 3. 보스레이드 상태조회 READ
- 보스 레이드 현재 상태(입장가능여부 및 레이드 진행중인 유저의 userId)를 알 수 있습니다.

### 4. 보스레이드 시작 CREATE
- 보스레이드 시작 가능하다면 중복되지 않는 raidRecordId를 생성합니다.

### 5. 보스레이드 종료 UPDATE
- 저장된 userId와 raidRecordId 가 일치하는지 체크합니다.
- status 값을 제한시간 초과 시 "실패", 성공 시 "성공"으로 저장합니다.
- REDIS 랭킹 데이터에 점수를 업데이트 해줍니다.

### 6. 보스레이드 랭킹 조회 READ
- 보스레이드 랭킹정보와 해당 유저의 랭킹 및 점수를 알 수 있습니다.
- 랭킹 기능은 REDIS를 이용하여 구현하였습니다.

### *** 보스레이드 관련 Static Data는 웹서버에 캐싱하여 사용하였습니다.
<img width="215" alt="스크린샷 2022-09-21 오전 12 26 51" src="https://user-images.githubusercontent.com/19259688/191299862-d7de7177-4a4f-4786-9dbf-3bb482754131.png">

### *** 랭킹 기능은 REDIS를 이용하여 구현 하였습니다
<img width="403" alt="스크린샷 2022-09-21 오전 1 14 01" src="https://user-images.githubusercontent.com/19259688/191310542-5ed09f2d-0ced-4639-9366-99fbe449e7ae.png">


## 📌 DB Modeling

- <img width="299" alt="스크린샷 2022-09-21 오전 1 12 46" src="https://user-images.githubusercontent.com/19259688/191310308-f095bf20-e885-4336-b953-942347a00a8b.png">


<br>

## 📌 API DOCS
- [포스트맨 API DOCS](https://documenter.getpostman.com/view/21381599/2s7Z13k3Ts)

<br><br>

## 📌 적용 기술

- 사용언어 : Javascript
- 런타임 환경 : Node.js
- 프레임워크 : Express
- ORM : Sequelize
- 데이터베이스 : MySQL, REDIS
  <br/> <br/>

## 📌 Commit Convention

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, linting
- refactor : 코드 리팩터링
- test : 테스트 코드, 리팩터링 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정, 그 외 자잘한 수정에 대한 커밋
