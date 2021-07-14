import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InputContact from "./phonecontact/InputContact";

function AdminPanel({ setAuth }) {
  const [infos, setInfos] = useState({
    user_name: "",
    user_phone: "",
    contact_name: "",
    contact_number: "",
  });

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
    const { user_name, phone_number } = parseRes[0];
    console.log(parseRes);
    setInfos({
      ...infos,
      user_name: user_name,
      user_phone: phone_number,
    });
  };

  useEffect(() => getInfo(), []);

  return (
    <div>
      <h1> Hello, {infos.user_name}</h1>
      <h2>{infos.user_phone}</h2>
      <button className='btn btn-primary' onClick={(e) => handleLogOut(e)}>
        Log Out
      </button>

      <InputContact name={infos.user_name} />
    </div>
  );
}

export default AdminPanel;
