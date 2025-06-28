import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

const lsKey = "employees";

const readEmployees = () => {
  try {
    return JSON.parse(localStorage.getItem(lsKey)) ?? [];
  } catch {
    return [];
  }
};

const writeEmployees = (list) => {
  localStorage.setItem(lsKey, JSON.stringify(list));
};

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return navigate("/login");
    setUserName(user.name.name);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out");
    setTimeout(() => navigate("/login"), 700);
  };

  useEffect(() => {
    setEmployees(readEmployees());
  }, []);

  // const saveEmployee = (payload) =>
  //   new Promise((resolve) => {
  //     setEmployees((prev) => {
  //       let next;
  //       if (payload._id) {
  //         next = prev.map((e) => (e._id === payload._id ? payload : e));
  //         handleSuccess("Updated");
  //       } else {
  //         const newEmp = { ...payload, _id: Date.now().toString() };
  //         next = [...prev, newEmp];
  //         handleSuccess("Created");
  //       }
  //       writeEmployees(next);
  //       resolve();
  //       return next;
  //     });
  //   }).catch(handleError);

  const saveEmployee = (payload) => {
    try {
      let updatedList;
      if (payload._id) {
        updatedList = employees.map((e) =>
          e._id === payload._id ? payload : e
        );
        handleSuccess("Employee updated");
      } else {
        const newEmp = { ...payload, _id: Date.now().toString() };
        updatedList = [...employees, newEmp];
        handleSuccess("Employee created");
      }
      writeEmployees(updatedList);
      setEmployees(updatedList);
      return true; // ✅ indicate success
    } catch (err) {
      handleError("Error saving employee");
      return false;
    }
  };

  const removeEmployee = (id) => {
    try {
      const updatedList = employees.filter((e) => e._id !== id);
      writeEmployees(updatedList);
      setEmployees(updatedList);
      handleSuccess("Employee deleted");
      return true;
    } catch (err) {
      handleError("Error deleting employee");
      return false;
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">Welcome, {userName}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md space-y-6">
          {/* Top Row */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Employee Directory
            </h2>
            <button
              onClick={() => setEditing({})}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md shadow transition duration-200"
            >
              + Add Employee
            </button>
          </div>

          {/* Employee Table */}
          <EmployeeTable
            rows={employees}
            onEdit={(e) => setEditing(e)}
            onDelete={removeEmployee}
          />
        </div>
      </main>

      {/* Modal */}
      <EmployeeForm
        open={editing !== null}
        defaultValues={editing}
        onClose={() => setEditing(null)}
        onSubmit={saveEmployee}
      />

      <ToastContainer />
    </div>
  );
}
