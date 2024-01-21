import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
    const [htmlContent, setHtmlContent] = useState("")
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:3000/");
        setHtmlContent(response.data)
    } catch (err) {
        console.error("Error fetching HTML: ", err);
    }
}
    getData();
    console.log(htmlContent)
  }, []);
  return (
    <div id="app" dangerouslySetInnerHTML={{__html: htmlContent}}></div>
  );
}

export default App;
