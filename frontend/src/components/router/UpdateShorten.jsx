import { useState } from "react";
import { apiUpdateShortUrl } from "../../helpers/api";
import { isValidUrl } from "../../helpers/validUrl";

export default function UpdateShorten() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleChangeShortUrl = (e) => {
    setShortUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.length > 0 && isValidUrl(url)) {
      fetchDeleteShortUrl();
    } else {
      setError("Invalid URL !");
    }
  };

  const fetchDeleteShortUrl = async () => {
    setLoading(true);
    try {
      const data = await apiUpdateShortUrl(shortUrl, url);
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
      <h1 className="h1">Update Short URL</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="shortUrl"
            type="text"
            value={shortUrl}
            onChange={handleChangeShortUrl}
            placeholder=""
          />
          <label htmlFor="shortUrl">Insert your current short URL</label>
        </div>
        <div className="form-floating  mb-3">
          <input
            className="form-control"
            id="newUrl"
            type="text"
            value={url}
            onChange={handleChangeUrl}
            placeholder=""
          />
          <label htmlFor="newUrl">Insert your new URL</label>
        </div>
        <button
          className="btn btn-light btn-lg d-grid gap-2 col-2 mx-auto"
          type="submit"
        >
          Update
        </button>
      </form>
      {loading && <p>Loading ...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <h2 className="mt-5">URL UPDATED</h2>

          <table className="table table-success table-striped mt-1 m-auto">
            <tbody>
              <tr>
                <th scope="row">URL Shorten</th>
                <td>
                  {window.location.protocol}//{window.location.host}/
                  {data.shortCode}
                </td>
              </tr>
              <tr>
                <th scope="row">URL Redirect to</th>
                <td>{data.url}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
