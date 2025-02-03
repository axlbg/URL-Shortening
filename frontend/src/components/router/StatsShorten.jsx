import { useState } from "react";

export default function StatsShorten() {
  const [url, setUrl] = useState("");

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(url);
  };
  return (
    <div className="container">
      <h1 className="h1">Your Short URL</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Insert your Short URL"
          value={url}
          onChange={handleChangeUrl}
        />
        <button type="submit">Load</button>
      </form>
    </div>
  );
}
