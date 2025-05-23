import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/allsiteinfo")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length) setInfo(data[0]);
      })
      .catch(console.error);
  }, []);

  const strip = html => {
    const d = document.createElement("div");
    d.innerHTML = html;
    return d.textContent.trim();
  };

  return (
    <footer>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-7 py-[10px]">
        {/* About */}
        <div className="flex flex-col gap-4">
          <NavLink to="/">
            <img
              src="/assets/frontend_assets/handy-logo1.png"
              alt="Handy logo"
              className="h-24"
            />
          </NavLink>
          <p className="text-gray-600 text-sm leading-relaxed">
            {info ? strip(info.about) : "Loading..."}
          </p>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-7">
          <h2 className="text-lg font-semibold text-gray-800">Company</h2>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact & Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Get in Touch</h2>
          {info ? (
            <>
              <p className="text-gray-600 text-sm whitespace-pre-line">
                {strip(info.address)}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={info.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Instagram
                </a>
                <a
                  href={info.twitter_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Twitter
                </a>
                <a
                  href={info.facbook_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Facebook
                </a>
                <a
                  href={info.android_app_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Android App
                </a>
                <a
                  href={info.ios_app_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  iOS App
                </a>
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-sm">Loading...</p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
