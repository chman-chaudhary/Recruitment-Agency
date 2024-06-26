import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function Navbar() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [btnText, setBtnText] = useState("Get Started");
  const [tokenValue, setTokenValue] = useState("");

  useEffect(() => {
    if (cookies.token && cookies.token !== "") {
      setBtnText("Logout");
    } else {
      setBtnText("Get Started");
    }
  }, [])

  const handleClick = async () => {
    if (cookies.token === "" || !cookies.token) {
      navigate("/login");
      setBtnText("Get Started");
    } else {
      let response = await axios.get("http://localhost:3000/logout", { withCredentials: true });
      if (response.data.success) {
        setBtnText("Get Started");
      }
      window.location.reload();
    }
  }

  const profile = async () => {
    if (cookies.token === "" || !cookies.token) {
      navigate("/login");
      setBtnText("Get Started");
    } else {
      try {
        let response = await axios.get(`http://localhost:3000/profile/`, { withCredentials: true });
        const { success, isLogin, username } = response.data;
        if (isLogin, success) {
          navigate(`/profile/${username}`);
        }
      } catch (error) {
        console.log("Network Error");
      }
    }
  }

  return (
    <div>
      <nav className="navbar-fonts bg-[rgba(0,0,0,0.1)] w-screen z-50 m-0 fixed top-0 h-[68px] backdrop-blur-md">
        <div className="navbar-fonts flex justify-between items-center py-2 px-3">
          <Link to="/" ><div className="text-white">Logo</div></Link>
          <div>
            <ul className="list-none">
              <li className="inline-block align-middle mr-4">
                <Link
                  className="px-6 py-3 min-w-28 min-h-9 align-middle rounded-full bg-transparent border-transparent shadow-none overflow-hidden inline-block relative font-bold text-center cursor-pointer no-underline
                  navbar-links"
                  to="/jobs"
                >
                  <span className="text-[14px] text-white font-bold text-center cursor-pointer align-middle">
                    Jobs
                  </span>
                </Link>
              </li>
              <li className="inline-block align-middle mr-4">
                <a
                  className="px-6 py-3 min-w-28 min-h-9 align-middle rounded-full bg-transparent border-transparent shadow-none overflow-hidden inline-block relative font-bold text-center cursor-pointer no-underline navbar-links"
                  href="#"
                >
                  <span className="text-[14px] text-white font-bold text-center cursor-pointer align-middle">
                    Saved
                  </span>
                </a>
              </li>
              <li className="inline-block align-middle mr-4">
                <a
                  className="px-6 py-3 min-w-28 min-h-9 align-middle rounded-full bg-transparent border-transparent shadow-none overflow-hidden inline-block relative border-2 font-bold text-center cursor-pointer no-underline navbar-links"
                  href="#" onClick={profile}
                >
                  <span className="text-[14px] text-white font-bold text-center cursor-pointer align-middle">
                    Profile
                  </span>
                </a>
              </li>
              <li className="inline-block align-middle mr-4">
                <Link
                  className="px-6 py-3 min-w-28 min-h-9 align-middle rounded-full bg-transparent border-transparent shadow-none overflow-hidden inline-block relative font-bold text-center cursor-pointer no-underline navbar-links"
                  to="/"
                >
                  <span className="text-[14px] text-white font-bold text-center cursor-pointer align-middle">
                    Home
                  </span>
                </Link>
              </li>
              <li className="inline-block align-middle mr-4">
                <div className="block">
                  <ul className="flex flex-row-reverse mx-[7px]">
                    <li className="flex flex-row-reverse -mx-[7px]">
                      <Link
                        onClick={handleClick}
                        className="rounded-full min-w-28 min-h-9 px-6 py-3 bg-[#F6F6F6] text-[#303030] overflow-hidden inline-block relative learn-btn-shadow"
                      >
                        <span className="text-[14px] align-middle font-bold bg-[#F6F6F6]">
                          {btnText}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
