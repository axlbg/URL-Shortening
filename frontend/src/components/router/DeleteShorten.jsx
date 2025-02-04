import { useState } from "react";
import { apiDeleteShortUrl } from "../../helpers/api";

export default function DeleteShorten() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.length > 0) {
      fetchDeleteShortUrl();
    } else {
      setError("Invalid URL !");
    }
  };

  const fetchDeleteShortUrl = async () => {
    setLoading(true);
    try {
      const data = await apiDeleteShortUrl(url);
      setData(data);
    } catch (error) {
      console.error("Error: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="h1">Delete Short URL</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="delete"
            type="text"
            placeholder=""
            value={url}
            onChange={handleChangeUrl}
          />
          <label htmlFor="delete">Insert your Short URL</label>
        </div>
        <button
          className="btn btn-light btn-lg d-grid gap-2 col-2 mx-auto"
          type="submit"
        >
          Delete
        </button>
      </form>
      {loading && <p>Loading ...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <h2 className="mt-5">URL DELETED</h2>}
    </div>
  );
}
