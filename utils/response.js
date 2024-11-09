export function sendJSONResponse(res, statusCode, data) {
  res.writeHeader(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}