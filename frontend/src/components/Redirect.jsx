import { useNavigate, useParams } from "react-router-dom";
import { apiGetOriginalUrl } from "../helpers/api";
import { useEffect } from "react";

export default function Redirect() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        console.log("abuenoo");
        const data = await apiGetOriginalUrl(shortcode);
        console.log(data.url);
        window.location.href = data.url;
      } catch (error) {
        console.error("Error: ", error);
        navigate("/404");
      }
    };

    fetchOriginalUrl();
  }, [shortcode, navigate]);

  return <p>Redirecting ...</p>;
}
