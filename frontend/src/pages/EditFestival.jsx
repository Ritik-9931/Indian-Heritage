import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
fetchSingleFestival,
updateFestival,
} from "../redux/slices/festivalSlice";

const EditFestival = () => {
const { id } = useParams();

const dispatch = useDispatch();
const navigate = useNavigate();

const {
festival,
loading,
error,
} = useSelector(
(state) => state.festival
);

const [formData, setFormData] =
useState({
festivalName: "",
description: "",
startDate: "",
endDate: "",
significance: "",
});

useEffect(() => {
dispatch(fetchSingleFestival(id));
}, [dispatch, id]);

useEffect(() => {
if (festival) {
setFormData({
festivalName:
festival.festivalName || "",


    description:
      festival.description || "",

    startDate:
      festival.startDate
        ?.split("T")[0] || "",

    endDate:
      festival.endDate
        ?.split("T")[0] || "",

    significance:
      festival.significance || "",
  });
}


}, [festival]);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]:
e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  await dispatch(
    updateFestival({
      id,
      festivalData: formData,
    })
  ).unwrap();

  alert(
    "Festival updated successfully"
  );

  navigate("/festivals");
} catch (err) {
  alert(err);
}


};

return ( <div className="min-h-screen bg-orange-50 py-10 px-4"> <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8"> <h1 className="text-4xl font-bold text-center mb-8">
Edit Festival </h1>


    {error && (
      <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-5">
        {error}
      </div>
    )}

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        type="text"
        name="festivalName"
        placeholder="Festival Name"
        value={formData.festivalName}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows="5"
        className="w-full border p-4 rounded-xl"
      />

      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />

      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />

      <textarea
        name="significance"
        placeholder="Significance"
        value={formData.significance}
        onChange={handleChange}
        rows="4"
        className="w-full border p-4 rounded-xl"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl"
      >
        {loading
          ? "Updating..."
          : "Update Festival"}
      </button>
    </form>
  </div>
</div>


);
};

export default EditFestival;
