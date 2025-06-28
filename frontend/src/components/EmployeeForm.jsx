import React, { useEffect, useState } from "react";

export default function EmployeeForm({ open, defaultValues, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    setForm({
      _id: defaultValues?._id ?? undefined,
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      role: defaultValues?.role ?? "",
    });
  }, [defaultValues]);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


const handleSubmit = async (e) => {
  e.preventDefault();
  const ok = await onSubmit(form);   // onSubmit now returns true/false (or a promise)
  if (ok) onClose();                 // close modal only when save succeeded
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl border p-6 w-full max-w-md space-y-6">
        <h3 className="text-xl font-semibold text-center">
          {form._id ? "Edit Employee" : "New Employee"}
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role (e.g. Developer)"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {form._id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
