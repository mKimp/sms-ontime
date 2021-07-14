import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InputContact from "./phonecontact/InputContact";
import AllContact from "./phonecontact/AllContact";
function AdminPanel({ setAuth }) {
  const [infos, setInfos] = useState([]);
  const [adminInfo, setadminInfo] = useState({
    adminName: "",
    adminPhone: "",
  });

  const { adminName, adminPhone } = adminInfo;

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const getInfo = async () => {
    const res = await fetch("http://localhost:5000/admin/", {
      method: "GET",
      headers: { token: localStorage.token },
    });
    const parseRes = await res.json();
    setInfos(parseRes);
    setadminInfo({
      ...adminInfo,
      adminName: parseRes[0].user_name,
      adminPhone: parseRes[0].phone_number,
    });
  };

  useEffect(() => getInfo(), []);

  return (
    <div>
      <h1>Hello, {adminName}</h1>
      <h2>{adminPhone}</h2>
      <button className='btn btn-primary' onClick={(e) => handleLogOut(e)}>
        Log Out
      </button>

      <AllContact infos={infos} />
    </div>
  );
}

export default AdminPanel;
