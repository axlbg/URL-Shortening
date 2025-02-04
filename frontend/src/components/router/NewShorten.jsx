import { useState } from "react";
import { isValidUrl } from "../../helpers/validUrl";
import { apiShortenUrl } from "../../helpers/api";

export default function NewShorten() {
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
      setError("Invalid URL !");
    }
  };

  const fetchShorten = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiShortenUrl(url);
      setDataShorten(data);
      setUrl("");
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
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="newUrl"
            type="text"
            placeholder=""
            value={url}
            onChange={handleChangeUrl}
          />
          <label htmlFor="newUrl">Insert your URL</label>
        </div>
        <button
          className="btn btn-light btn-lg d-grid gap-2 col-2 mx-auto"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
      {loading && <p>Loading ...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {dataShorten && (
        <table className="table table-success table-striped mt-5 m-auto">
          <tbody>
            <tr>
              <th scope="row">URL Shorten</th>
              <td>
                {window.location.protocol}//{window.location.host}/
                {dataShorten.shortCode}
              </td>
            </tr>
            <tr>
              <th scope="row">URL Redirect to</th>
              <td>{dataShorten.url}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
