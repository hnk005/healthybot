export const HTTP_STATUS = {
  // 2xx: Thành công
  OK: 200, // Yêu cầu thành công, phản hồi chứa dữ liệu mong muốn
  CREATED: 201, // Đối tượng mới đã được tạo thành công
  ACCEPTED: 202, // Yêu cầu được chấp nhận nhưng chưa xử lý xong
  NO_CONTENT: 204, // Thành công nhưng không có nội dung phản hồi

  // 3xx: Chuyển hướng
  MOVED_PERMANENTLY: 301, // Tài nguyên đã được di chuyển vĩnh viễn đến URL mới
  FOUND: 302, // Tài nguyên được tìm thấy nhưng tạm thời được chuyển hướng
  NOT_MODIFIED: 304, // Dữ liệu không thay đổi, có thể dùng dữ liệu cache

  // 4xx: Lỗi phía client
  BAD_REQUEST: 400, // Yêu cầu không hợp lệ (ví dụ: thiếu tham số, dữ liệu sai)
  UNAUTHORIZED: 401, // Người dùng chưa xác thực hoặc token không hợp lệ
  FORBIDDEN: 403, // Người dùng không có quyền truy cập tài nguyên này
  NOT_FOUND: 404, // Không tìm thấy tài nguyên hoặc đường dẫn không tồn tại
  METHOD_NOT_ALLOWED: 405, // Phương thức HTTP không được phép trên tài nguyên này
  CONFLICT: 409, // Xung đột dữ liệu (ví dụ: đăng ký email đã tồn tại)
  UNPROCESSABLE_ENTITY: 422, // Dữ liệu đầu vào hợp lệ nhưng không thể xử lý

  // 5xx: Lỗi phía server
  INTERNAL_SERVER_ERROR: 500, // Lỗi máy chủ nội bộ, thường do lỗi hệ thống
  NOT_IMPLEMENTED: 501, // Máy chủ chưa hỗ trợ tính năng yêu cầu
  BAD_GATEWAY: 502, // Máy chủ trung gian nhận phản hồi không hợp lệ từ máy chủ khác
  SERVICE_UNAVAILABLE: 503, // Máy chủ tạm thời không khả dụng (quá tải, bảo trì)
  GATEWAY_TIMEOUT: 504, // Máy chủ trung gian không nhận phản hồi kịp thời từ máy chủ gốc
} as const;
