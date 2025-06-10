export function transformStream(
  stream: ReadableStream<Uint8Array>,
): ReadableStream {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let lastBuffer = "";

  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      // Giải mã chunk thành text
      const text = decoder.decode(chunk, { stream: true });

      // Ghép với buffer cũ để tránh mất dữ liệu
      const combinedText = lastBuffer + text;
      let newBuffer = "";

      // Cắt dòng nhưng giữ lại phần cuối nếu chưa kết thúc bằng "\n"
      const lines = combinedText.split("\n");
      if (!combinedText.endsWith("\n")) {
        newBuffer = lines.pop() ?? "";
      }

      let modifiedText = "";
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith("data:")) {
          const jsonStr = trimmedLine.slice(5).trim();
          if (jsonStr === "[DONE]") {
            continue;
          }

          try {
            const jsonData = JSON.parse(jsonStr.replace(/\\n/g, "<br />"));
            const chunkContent = jsonData?.choices?.[0]?.delta?.content;

            if (typeof chunkContent === "string") {
              modifiedText += chunkContent;
            }
          } catch (err) {
            console.error("Lỗi JSON:", err, "Dữ liệu lỗi:", jsonStr);
          }
        }
      }

      // Cập nhật buffer mới
      lastBuffer = newBuffer;

      // Đẩy dữ liệu đã chỉnh sửa vào stream
      controller.enqueue(encoder.encode(modifiedText));
    },

    flush(controller) {
      if (lastBuffer) {
        controller.enqueue(encoder.encode(lastBuffer));
      }
    },
  });

  return stream.pipeThrough(transformStream);
}
