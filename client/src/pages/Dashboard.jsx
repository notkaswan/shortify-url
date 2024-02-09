import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [change, setChange] = useState(0);
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  // let { subpage } = useParams();
  // if (subpage === undefined) {
  //   subpage = "profile";
  // }
  useEffect(() => {
    axios.get("user-urls").then(({ data }) => {
      setUrls(data);
    });
  }, [change]);

  async function logout() {
    await axios.post("/logout");
    setRedirect("/login");
    setUser(null);
  }
  async function deleteUrl(e) {
    await axios.delete(`/delete/${e.target.value}`);
    setChange(change + 1);
  }
  function createNew() {
    setRedirect("/form");
  }
  function updateUrl(e) {
    // console.log("/form/" + e.target.value);
    setRedirect("/form/" + e.target.value);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="mt-10 text-center max-w-lg mx-auto">
        Logged in as {user.name} ({user.email})<br />
        <button onClick={logout} className="primary max-w-sm mt-2">
          Logout
        </button>
        <button onClick={createNew} className="primary max-w-sm mt-2">
          Create New Link
        </button>
      </div>
      <div className="text-center mt-4 max-w-lg mx-auto">
        {urls.length > 0 &&
          urls.map((url) => (
            <div className="bg-gray-300 p-4 mb-4 rounded-lg">
              <table className="table-fixed w-full">
                <tr>
                  <th className="">Original Link:</th>
                  <th className="">
                    <div className="truncate hover:text-clip">
                      {url.fullUrl}
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Shortened Link:</th>
                  <th>{url.shortUrl}</th>
                </tr>
                <tr>
                  <th>Views:</th>
                  <th>{url.clicks}</th>
                </tr>
              </table>
              <div className="flex gap-4">
                <button
                  value={url.shortUrl}
                  onClick={deleteUrl}
                  className="primary"
                >
                  delete
                </button>
                <button value={url._id} onClick={updateUrl} className="primary">
                  update
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
