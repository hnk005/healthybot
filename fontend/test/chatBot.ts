// import axios from "axios";

// const API_URL = "http://192.168.1.7:5000/v1/chat/completions";

// function extractContent(data: string) {
//   // Loại bỏ "data: " nếu có
//   if (data.startsWith("data: ")) {
//     data = data.replaceAll("data: ", "").trim(); // Xóa "data: " và khoảng trắng dư
//   }
//   try {
//     const jsonData = JSON.parse(data);
//     return jsonData.choices?.[0]?.delta?.content || "";
//   } catch (error) {
//     console.error("Lỗi parse JSON:", error);
//     return "";
//   }
// }

// async function chatWithVistralStream(prompt) {
//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         model: "Vistral-7B-Chat",
//         messages: [{ role: "user", content: prompt }],
//         max_tokens: 200,
//         stream: true,
//       },
//       {
//         responseType: "stream",
//         onDownloadProgress: (progressEvent) => {
//           const chunk = progressEvent.event.target.response;
//           let fullResponse = "";
//           const lines = chunk
//             .toString()
//             .split("\n")
//             .filter((line) => line.trim());

//           for (let line of lines) {
//             if (line.startsWith("data: ")) {
//               try {
//                 const jsonStr = line.replace("data: ", "").trim();
//                 const jsonData = JSON.parse(jsonStr);
//                 const content: string =
//                   jsonData.choices?.[0]?.delta?.content || "";

//                 fullResponse += content; // Ghép nội dung lại
//               } catch (error) {
//                 console.error("Lỗi parse JSON:", error.message);
//               }
//             }
//           }
//           console.log(fullResponse);
//         },
//       },
//     );

//     // response.data.on("data", (chunk) => {
//     //   console.log(chunk);
//     // });

//     // response.data.on("end", () => {
//     //   console.log("end");
//     // });
//   } catch (error) {
//     console.error("Lỗi:", error.response?.data || error.message);
//   }
// }

// chatWithVistralStream("Xin chào, bạn khỏe không?");
