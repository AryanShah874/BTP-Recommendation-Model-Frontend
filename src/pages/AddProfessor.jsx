import React, { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import AccountNav from "../components/AccountNav";
import Modal from "../components/Modal";
import ProfessorForm from "../components/ProfessorForm";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AddProfessor = () => {
  const { user, isLoading } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || user?.role !== "admin")) {
      navigate("/login/admin");
    }
  }, [user, isLoading]);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProfessors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/professor/all`, {
        method: "GET",
        // credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        setProfessors(data.professors);
        setLoading(false);
      } else {
        console.log(data.error);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfessors();
  }, []);

  if (loading || isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-[70vh] text-center text-white p-10">
      <AccountNav id={user?.role} />

      <div>
        <Link to={"/admin/addprofessor/new"} className="text-red-500 bg-white p-2 px-4 rounded-2xl">
          Add Professor
        </Link>

        {professors.length === 0 ? (
          <p className="mt-10 text-black font-bold">No Professors</p>
        ) : (
          <div className="overflow-x-auto mt-10">
            <table className="w-full text-sm text-center text-gray-500">
              <thead className="text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Department
                  </th>
                </tr>
              </thead>

              <tbody>
                {professors.map((professor, index) => (
                  <tr key={professor._id} className="text-black bg-gray-300 border-b-2">
                    <Link to={`${professor._id}`} className="contents">
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {professor.name.firstName} {professor.name.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{professor.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{professor.department}</td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProfessor;
