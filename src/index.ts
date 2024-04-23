//imports
import app from "./app";
// listen app in port
app.listen(app.get("port"));
console.log("✅ Server on port", app.get("port"));
