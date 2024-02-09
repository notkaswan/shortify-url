import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";

export default function FormPage() {
  const { id } = useParams();
  const [fullUrl, setFullUrl] = useState("");
  const [views, setViews] = useState(0);
  const [shortUrl, setShortUrl] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/url/" + id).then((res) => {
      console.log(id);
      const { data } = res;
      setFullUrl(data.fullUrl);
      setViews(data.views);
      setShortUrl(data.shortUrl);
    });
  }, [id]);

  async function shortenUrl(e) {
    e.preventDefault();
    try {
      if (id) {
        // console.log(views);
        await axios.put("/shorten", { id, fullUrl });
        alert("updated!!!");
      } else {
        const shortenedUrl = await axios.post("/shorten", {
          fullUrl,
        });
        setShortUrl(shortenedUrl.data.shortUrl);
      }
    } catch (err) {
      alert("Invalid Url.");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Enter Url</h1>
        <form className="max-w-md mx-auto" onSubmit={shortenUrl}>
          <input
            type="text"
            placeholder="Enter Url"
            value={fullUrl}
            onChange={(e) => setFullUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Url"
            value={shortUrl}
            readOnly
          />
          <button className="primary">Shorten Url</button>
        </form>
        <Link to={"/dashboard"}>
          <button className=" mt-4 primary">Show all shortened Urls</button>
        </Link>
      </div>
    </div>
  );
}
