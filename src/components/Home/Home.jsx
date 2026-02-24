import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGet, setIsLoadingGet] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const schema = z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(30, "Title must be at most 30 characters"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(300, "Description must be at most 300 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
    setValue: setValueEdit,
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  const addTodos = (todoData) => {
    setIsLoading(true);
    axios
      .post("https://todo-nti.vercel.app/todo/create", todoData, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then(() => {
        toast.success("Note created successfully");
        reset();
        getTodos();
      })
      .catch((error) => {
        toast.error("Failed to create note");
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const getTodos = () => {
    setIsLoadingGet(true);
    axios
      .get("https://todo-nti.vercel.app/todo/get-all", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => {
        setTodoList(response.data.todos);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingGet(false));
  };

  const handleDelete = (id) => {
    setIsLoadingDelete(id);
    axios
      .delete(`https://todo-nti.vercel.app/todo/delete-todo/${id}`, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then(() => {
        toast.success("Note deleted successfully");
        getTodos();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingDelete(false));
  };

  const handleUpdate = (todoData) => {
    if (!currentTodo) return;
    setIsLoadingUpdate(true);
    axios
      .patch(
        `https://todo-nti.vercel.app/todo/update-todo/${currentTodo._id}`,
        todoData,
        {
          headers: { token: localStorage.getItem("userToken") },
        },
      )
      .then(() => {
        getTodos();
        toast.success("Note updated successfully");
        setIsModalOpen(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingUpdate(false));
  };

  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setValueEdit("title", todo.title);
    setValueEdit("description", todo.description);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen  dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900 pb-12">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <i className="fas fa-check-double text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  My Notes
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Organize your thoughts
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-800">
              <i className="fas fa-layer-group mr-2 text-emerald-600"></i>
              {todoList.length} Notes
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Note Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-emerald-100/50 dark:shadow-none border border-emerald-100/50 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-plus text-emerald-600 dark:text-emerald-400 text-sm"></i>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Note
            </h2>
          </div>

          <form onSubmit={handleSubmit(addTodos)} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  {...register("title")}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-0 focus:border-emerald-500 transition-all outline-none ${
                    errors.title
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                  placeholder="Enter note title..."
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-0 focus:border-emerald-500 transition-all outline-none resize-none ${
                    errors.description
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                  placeholder="Write your thoughts here..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/30 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus"></i>
                    <span>Add Note</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Notes Grid */}
        {isLoadingGet ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 animate-pulse"
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                <div className="flex gap-2 mt-4">
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : todoList.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-clipboard-list text-4xl text-emerald-600 dark:text-emerald-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No notes yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Create your first note to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {todoList.map((todoItem) => (
              <div
                key={todoItem._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 dark:hover:shadow-none transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/30">
                    {todoItem.title.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    Note
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {todoItem.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {todoItem.description}
                </p>

                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => openEditModal(todoItem)}
                    className="flex-1 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <i className="fas fa-pen text-xs"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todoItem._id)}
                    disabled={isLoadingDelete === todoItem._id}
                    className="flex-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isLoadingDelete === todoItem._id ? (
                      <i className="fas fa-circle-notch fa-spin text-xs"></i>
                    ) : (
                      <i className="fas fa-trash text-xs"></i>
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all scale-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                  <i className="fas fa-pen text-amber-600 dark:text-amber-400"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Note
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-gray-500 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form
              onSubmit={handleSubmitEdit(handleUpdate)}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  {...registerEdit("title")}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-0 focus:border-amber-500 transition-all outline-none ${
                    errorsEdit.title
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                />
                {errorsEdit.title && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errorsEdit.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  {...registerEdit("description")}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-0 focus:border-amber-500 transition-all outline-none resize-none ${
                    errorsEdit.description
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                />
                {errorsEdit.description && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errorsEdit.description.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoadingUpdate}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 rounded-xl shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoadingUpdate ? (
                    <i className="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    <i className="fas fa-save"></i>
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
