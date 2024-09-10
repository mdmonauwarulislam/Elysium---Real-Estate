/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { useEffect, useState } from "react";
  import { app } from "../firebase";
  import { useSelector } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  
  export const UpdateListing = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);
    //storing photos
    const [files, setFiles] = useState([]);
    //uploaded image URLs
    const [formData, setFormData] = useState({
      imageUrls: [],
      name: "",
      description: "",
      address: "",
      type: "rent",
      bedrooms: 1,
      bathrooms: 1,
      regularPrice: 0,
      discountPrice: 0,
      offer: false,
      parking: false,
      furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
  
    const [uploading, setUploading] = useState(false);
  
    const [error, setError] = useState(false);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchListing = async () => {
        const listingId = params.listingId;
        const res = await fetch(`${import.meta.env.VITE_API}/api/listing/get/${listingId}`);
        const data = await res.json();
  
        if (data.success === false) {
          return;
        }
  
        setFormData(data);
      };
  
      fetchListing();
    }, []);
    const handleImageSubmit = (e) => {
      //e.preventDefault -> for submiting a form
  
      if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        //limit number of photos 6
        //I need several promises since I need to upload one by one
        setUploading(true);
        setImageUploadError(false);
        const promises = [];
  
        // Iterate through selected files and initiate upload
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i])); // Store each image
        }
  
        //   // Wait for all uploads to complete
        Promise.all(promises)
          .then((urls) => {
            // Update formData with uploaded image URLs
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadError(false);
            setUploading(false);
          })
  
          .catch((error) => {
            setImageUploadError("Imagae upload failed");
            setUploading(false);
            // Handle errors here if needed
          });
      } else {
        setImageUploadError("You can only upload 6 images.");
        setUploading(false);
      }
    };
    //upload to fire storage
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        // Get Firebase Storage instance
        const storage = getStorage(app);
        // Generate unique filename
        const fileName = new Date().getTime() + file.name;
        // Create a reference to the file in Storage
        const storageRef = ref(storage, fileName);
        // Initiate upload task
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        // Track upload progress (optional)
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            reject(error);
          },
          () => {
            // Upload completed successfully
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
              // Get download URL of the uploaded file
              // Resolve promise with download URL
            });
          }
        );
      });
    };
  
    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    };
    //type only can be sale or rent
    const handleChange = (e) => {
      if (e.target.id === "sale" || e.target.id === "rent") {
        setFormData({
          ...formData,
          type: e.target.id,
        });
      }
  
      if (
        e.target.id === "parking" ||
        e.target.id === "furnished" ||
        e.target.id === "offer"
      ) {
        setFormData({
          ...formData,
          //either parking, offer, furnish : true
          [e.target.id]: e.target.checked,
        });
      }
  
      if (
        e.target.type === "number" ||
        e.target.type === "text" ||
        e.target.type === "textarea"
      ) {
        setFormData({
          ...formData,
          //either name, address, description :
          [e.target.id]: e.target.value,
        });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        //lets see it clear previous error
        setError(false);
        if (formData.imageUrls.length < 1)
          return setError("You must upload at least one image.");
        //+ will make data to snnumber before doing any add
  
        setLoading(true);
        setError(false);
  
        const res = await fetch(`${import.meta.env.VITE_API}/api/listing/update/${params.listingId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
        }
  
        navigate(`/listing/${data._id}`);
      } catch (error) {
        setError(error.message);
        setLoading(false);
  
        const data = await res.json();
        setLoading(false);
  
        if (data.success === false) {
          setError(data.message);
        }
      }
    };
    return (
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Update Listing
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 p-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
  
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
  
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  className="p-1 border border-gray-300 rounded-lg "
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="p-1 border border-gray-300 rounded-lg "
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="p-1 border border-gray-300 rounded-lg "
                  type="number"
                  id="regularPrice"
                  min="0"
                  max="10000000000"
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  {" "}
                  <p>Regular Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
  
              <div className="flex items-center gap-3">
                <input
                  className="p-1 border border-gray-300 rounded-lg "
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000000000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  {" "}
                  <p>Discounted Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2 ">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="border p-3 border-gray-300 rounded w-full "
                type="file"
                id="images"
                accept="images/*"
                multiple
              />
              <button
                //I want to just submit photo
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="p-3 text-green-700 border border-green-600 hover:shadow-lg  rounded uppercase disabled:opcacity-80"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
  
            <p className="text-red-700 text-xs">{imageUploadError}</p>
  
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border-item-center"
                >
                  <img
                    src={url}
                    alt="Listing image"
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg"
                  >
                    {" "}
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-70"
            >
              {loading ? "Updating ..." : "Updating listing"}
            </button>
            {error && <p className="text-xs text-red-700">{error}</p>}
          </div>
        </form>
      </main>
    );
  };