import { useRef } from "react";
import LocationMap from "../component/LocationMap";
import VoiceReport from "../component/VoiceReport";
import ImageDescription from "../component/ImageDescription";

const AddPost = ({
  t,
  form,
  handleChange,
  handleSubmit,
  categories,
  closeModal,
  setImageFile,
  imagePreview,
  setImagePreview,
  firstFieldRef,
  setForm, // 👈 added for updating category & description
}) => {
  const dialogRef = useRef(null);
  const fileInputRef = useRef(null);

  return (
    <div
      ref={dialogRef}
      className="relative z-10 overflow-y-scroll h-[90vh] w-full max-w-xl mx-4 
       rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl custom-scrollbar"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-700">
        <h3 id="add-post-title" className="text-xl font-semibold">
          {t.posts.addNew}
        </h3>
        <button
          onClick={closeModal}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Author + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="author" className="text-sm text-gray-300 mb-1">
              {t.posts.author}
            </label>
            <input
              ref={firstFieldRef}
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder={t.posts.author}
            />
          </div>
          <LocationMap />
        </div>

        {/* Photo uploader + auto description generator */}
        <ImageDescription
          t={t}
          setImageFile={setImageFile}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          fileInputRef={fileInputRef}
          setForm={setForm}
        />

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm text-gray-300 mb-1">
            {t.posts.category}
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">{t.posts.selectCategory}</option>
            {categories
              .filter((c) => c.key !== "allIssues")
              .map((c, idx) => (
                <option key={idx} value={t.categories[c.key]}>
                  {t.categories[c.key]}
                </option>
              ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm text-gray-300 mb-1">
            {t.posts.description}
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"
            placeholder={t.posts.description}
          />
        </div>

        <VoiceReport />

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-700"
          >
            {t.posts.cancel}
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-green-400 text-gray-900 font-bold hover:bg-opacity-90"
          >
            {t.posts.post}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
