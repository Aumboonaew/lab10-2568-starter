import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useState, useEffect } from "react";

export default function RandomUserPage() {
  const [users, setUsers] = useState<any[]>([]); // แก้เป็น array
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);

  // โหลดค่า genAmount จาก localStorage เมื่อเปิดหน้าเว็บ
  useEffect(() => {
    const savedAmount = localStorage.getItem("genAmount");
    if (savedAmount) {
      setGenAmount(parseInt(savedAmount));
    }
  }, []);

  // บันทึกค่า genAmount ลง localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("genAmount", genAmount.toString());
  }, [genAmount]);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://randomuser.me/api/?results=${genAmount}`
      );
      const rawUsers = resp.data.results;

      // ทำความสะอาดข้อมูลด้วย cleanUser และ map
      const cleanedUsers = rawUsers.map((user: any) => cleanUser(user));
      setUsers(cleanedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(e) => setGenAmount(parseInt(e.target.value) || 1)}
          value={genAmount}
          min="1"
          max="100"
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>

      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}

      <div className="mt-4">
        {!isLoading &&
          users.map((user) => (
            <UserCard
              key={user.email} // ใช้ email เป็น key
              name={user.name}
              email={user.email}
              imgUrl={user.imgUrl}
              address={user.address}
            />
          ))}
      </div>
    </div>
  );
}
