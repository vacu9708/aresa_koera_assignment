![image](https://github.com/vacu9708/aresa_koera_assignment/assets/67142421/2f387d5f-7213-4106-9a2f-d967414b47a2)
![image](https://github.com/vacu9708/aresa_koera_assignment/assets/67142421/de37f726-4294-4511-a7a7-414161e2c167)

---

# 개발 환경 세팅 방식
### Database 설치 과정
![image](https://github.com/vacu9708/aresa_korea_assignment/assets/67142421/9e121753-2e5b-4c8c-8876-40c19d6f3eee)
![image](https://github.com/vacu9708/aresa_korea_assignment/assets/67142421/5d436d73-d310-4ea4-ac21-9aff32c794ce)
![image](https://github.com/vacu9708/aresa_korea_assignment/assets/67142421/d4df3e94-ef59-473e-abae-67426bafb541)
![image](https://github.com/vacu9708/aresa_korea_assignment/assets/67142421/10ac2571-f7ac-4f25-b611-7cda2ee76f6f)
![image](https://github.com/vacu9708/aresa_korea_assignment/assets/67142421/a6b9f808-31ed-4b51-955f-34a59ddc1e43)

비밀번호는 123으로 설정, Installer의 지시를 따라서 설치 완료 후 DB 접속<br>
![image](https://github.com/vacu9708/aresa_korea_assignment/assets/67142421/70b70c30-c9ba-413f-980c-a5fb33895051)

### Database 테이블 생성 SQL

~~~sql
CREATE DATABASE real_estate;
USE real_estate;
CREATE TABLE IF NOT EXISTS price (
  aptId INT NOT NULL,
  date DATE NOT NULL,
  value INT NOT NULL,
  PRIMARY KEY(aptId, date)
);
~~~
- Partial dependency, transitive dependency 모두 없어므로 제3 정규화된 table임.
- aptId와 date를 primary key로 설정

### Frontend, Backend 설치 command
install.bat 실행
### Frontend, Backend 실행 command
execute_frontend.bat, execute_backend.bat 실행

## 예제 실행 Step 별 화면 변경사항
### DB 에 아무 정보 없을 때 화면
![image](https://github.com/vacu9708/nestjs_assignment_before_interview/assets/67142421/f25f6f91-0661-4f16-9ca4-d6f3af91b95f)

### POST historical_price 에 임의의 값 post
#### post curl 커멘드:
~~~
curl -X POST -H "Content-Type: application/json" -d "{ \"aptId\": 1, \"year\": 2023, \"monthStart\": 1, \"values\": [10, 20, 30, 40, 50] }" http://localhost:3001/aresa-api/historical_price
~~~
#### post 이후 새로고침 화면:
![image](https://github.com/vacu9708/aresa_korea_assignment/assets/67142421/0a3818f4-b6b4-453b-b47f-04ad25bde8aa)

### POST future_price 에 임의의 값 post
#### post curl 커멘드:
~~~
curl -X POST -H "Content-Type: application/json" -d "{ \"aptId\": 1, \"year\": 2023, \"monthStart\": 6, \"values\": [70, 80, 60, 50, 40, 30, 20] }" http://localhost:3001/aresa-api/future_price
~~~
#### post 이후 새로고침 화면:
![image](https://github.com/vacu9708/aresa_korea_assignment/assets/67142421/128c9b98-63fe-481b-b986-2ef013e233ba)
