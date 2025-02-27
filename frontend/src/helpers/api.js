const apiUrl = "https://railway-url-shortening-production.up.railway.app/shorten";

export const apiShortenUrl = async (url) => {
  const response = await fetch(apiUrl, {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json", // JSON body
    },
    body: JSON.stringify({ url }), // Obj to JSON
  });

  if (!response.ok) {
    throw new Error("Error shortening url");
  }

  return response.json();
};

export const apiGetOriginalUrl = async (shortUrl) => {
  const response = await fetch(`${apiUrl}/${shortUrl}`);

  if (!response.ok) {
    throw new Error("Error URL not found");
  }

  return response.json();
};

export const apiGetStats = async (shortUrl) => {
  const response = await fetch(`${apiUrl}/${shortUrl}/stats`);

  if (!response.ok) {
    throw new Error("Error fetching stats");
  }

  return response.json();
};

export const apiDeleteShortUrl = async (shortUrl) => {
  const response = await fetch(`${apiUrl}/${shortUrl}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting url");
  }

  return response;
};

export const apiUpdateShortUrl = async (shortUrl, url) => {
  const response = await fetch(`${apiUrl}/${shortUrl}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // JSON body
    },
    body: JSON.stringify({ url }), // Obj to JSON
  });

  if (!response.ok) {
    throw new Error("Error updating url");
  }

  return response.json();
};
