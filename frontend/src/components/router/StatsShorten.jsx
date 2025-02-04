import { useState } from "react";
import { apiGetStats } from "../../helpers/api";

export default function StatsShorten() {
  const [url, setUrl] = useState("");
  const [dataStats, setDataStats] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.length > 0) {
      fetchStats();
    } else {
      setError("Invalid URL !");
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetStats(url);
      setDataStats(data);
    } catch (error) {
      console.error("Error: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="h1">Your URL Stats</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="stats"
            type="text"
            placeholder=""
            value={url}
            onChange={handleChangeUrl}
          />
          <label htmlFor="stats">Insert your Short URL</label>
        </div>
        <button
          className="btn btn-light btn-lg d-grid gap-2 col-2 mx-auto"
          type="submit"
        >
          Load
        </button>
      </form>
      {loading && <p>Loading ...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {dataStats && (
        <table className="table table-success table-striped mt-5 m-auto">
          <tbody>
            <tr>
              <th scope="row">URL Shorten</th>
              <td>
                {window.location.protocol}//{window.location.host}/
                {dataStats.shortCode}
              </td>
            </tr>
            <tr>
              <th scope="row">URL Redirect to</th>
              <td>{dataStats.url}</td>
            </tr>
            <tr>
              <th scope="row">Created at</th>
              <td> {dataStats.createdAt}</td>
            </tr>
            <tr>
              <th scope="row">Updated at</th>
              <td>{dataStats.updatedAt}</td>
            </tr>
            <tr>
              <th scope="row">Access count</th>
              <td>{dataStats.accessCount}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
