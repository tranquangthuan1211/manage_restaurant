// app.ts hoặc index.ts
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(session({
  secret: "your-secret-key",            // khóa bí mật để mã hóa session ID
  resave: false,                        // không lưu lại session nếu không thay đổi
  saveUninitialized: false,            // không lưu session mới nếu không có gì lưu
  cookie: {
    httpOnly: true,                    // chặn JavaScript đọc cookie
    maxAge: 1000 * 60 * 60,            // 1 giờ
  },
}));

// Giả lập đăng nhập
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // kiểm tra thông tin người dùng (ở đây demo)
  if (username === "admin" && password === "123456") {
    req.session.userId = "admin-id";
    console.log("🍪 Incoming Cookies:", req.cookies);
    return res.json({ message: "Đăng nhập thành công" });
  }

  res.status(401).json({ message: "Sai thông tin đăng nhập" });
});

// Middleware xác thực
function authMiddleware(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: "Chưa đăng nhập" });
}

// Route chỉ dành cho người đã đăng nhập
app.get("/profile", authMiddleware, (req, res) => {
    console.log("header:", req.headers);
  console.log("🍪 Incoming Cookies:", req.cookies);
  res.json({ message: `Xin chào ${req.session.userId}` });
});

// Đăng xuất
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); // Xóa cookie
    res.json({ message: "Đã đăng xuất" });
  });
});

app.listen(3000, () => {
  console.log("Server đang chạy ở http://localhost:3000");
});
