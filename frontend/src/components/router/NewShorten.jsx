import { useState } from "react";

export default function NewShorten() {
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
      <h1 className="h1">Create Short URL</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Insert your URL"
          value={url}
          onChange={handleChangeUrl}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
