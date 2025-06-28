import React from "react";

export default function EmployeeTable({ rows, onEdit, onDelete }) {
  if (!rows.length)
    return <p className="text-center text-slate-500">No employees yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100 text-left text-sm">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e._id} className="border-t">
              <td className="p-2">{e.name}</td>
              <td className="p-2">{e.email}</td>
              <td className="p-2">{e.role}</td>
              <td className="p-2">
                <button
                  onClick={() => onEdit(e)}
                  className="mr-2 text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(e._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
