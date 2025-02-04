import { useState } from "react";
import { isValidUrl } from "../../helpers/validUrl";

export default function NewShorten() {
  const apiUrl = "http://localhost:8080/shorten";

  const [url, setUrl] = useState("");
  const [dataShorten, setDataShorten] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.length > 0 && isValidUrl(url)) {
      fetchShorten();
    } else {
      setError("Invalid URL");
    }
  };

  const fetchShorten = async () => {
    setLoading(true);
    setError(null);
    try {
      const requestBody = { url: url };
      const response = await fetch(apiUrl, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // JSON body
        },
        body: JSON.stringify(requestBody), // Obj to JSON
      });

      const data = await response.json();
      setDataShorten(data);
    } catch (error) {
      console.error("Error: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="h1">Create Short URL</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Insert your URL"
          value={url}
          onChange={handleChangeUrl}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
      {loading && <p>Loading ...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {dataShorten && (
        <div>
          <p>URL Shorten: {dataShorten.shortCode}</p>
        </div>
      )}
    </div>
  );
}
