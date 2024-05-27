# Hướng dẫn cài đặt data-script

- Yêu cầu: có mysql
- B1: Tải file data-script đã được cung cấp
- B2: Import file vào hoặc copy code vào file script để chạy
- B3: Sau khi chạy thành công mở các table lên để kiểm tra

# Hướng dẫn cài đặt và sử dụng back-end cafe

- Yêu cầu: Cài jdk 17 trở lên, git, mvn
- Link github: https://github.com/NguyenHongThaiii/cafe-springboot.git
- B1: Mở terminal hoặc cmd lên và gõ lệnh "git clone https://github.com/NguyenHongThaiii/cafe-springboot.git" nếu chưa có resources
- B2: Sau đó mở thư mục hiện hành và gõ lệnh "mvn clean" sau đó "mvn install" để build các mapstruct. Nếu không có mvn có thể sử dụng tool trong inteliji hoặc SpringToolSuite để dùng
- B3: Sau khi build thành công thì chạy ứng dụng với file main
- B4: Mở các công cụ để kiểm tra như postman hoặc truy cập vào "http://localhost:8080/swagger-ui/index.html#/" để xem document về api (Hiện tại chưa chỉnh sửa lại)

# Hướng dẫn cài đặt và sử dụng front-end cafe

- Yêu cầu: cài nodejs, git
- Link github: https://github.com/NguyenHongThaiii/Cafe_Web_Specializations.git
- B1: Mở terminal hoặc cmd lên và gõ lệnh "git clone https://github.com/NguyenHongThaiii/Cafe_Web_Specializations.git" nếu chưa có resource
- B2: Mở terminal hoặc cmd lên và gõ lệnh "npm install" hoặc "yarn" (Nếu có yarn) tại thư mục hiện hành vừa tải về
- B3: Sau khi đã cài các package thành công thì gõ lệnh "npm run dev" hoặc "yarn dev (Nếu có yarn)" để chạy chương trình
- B4: Mở trình duyệt web lên với url là "http://localhost:3000" để truy cập vào website

# Các công nghệ sử dụng

## Front-end

- Language programming: javascript (reactjs framework)
- State management: redux, react-context, redux-toolkit
- Fetching: axios
- Notification: react-toastify
- Icon: react-icon
- Form-handling: react-hook-form, yup
- Map: map-box
- Pagination: react-paginate
- Build tool: vite + reactjs
- Styling: tailwindcss + scss
- Routing: react-router-dom

## Back-end

- Language programming: java version 17 (springboot framework version 3 )
- Security: springboot security version 6
- swagger: spring swagger
- Mapepr: model mapper, mapstruct
- Pattern: dto, dao
- Webservice: restful
- Database management system: mysql
- Authorization & Authentication: jwt (json-web-token)

## Need to fix

Reply comment in explore
