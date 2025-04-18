import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import Lottie from "lottie-react";
import uploadIcon from "../../../../assets/images/json/upload.json";
import Images from "../../../../assets/Images/Images";

const UploadFile = ({
  uploadedFiles,
  setUploadedFiles,
  setUploadedFile,
  fileError,
  setFileError,
  maxLength = 5,
  maxLengthError,
  setMaxLengthError,
  initialImages = [],
}) => {
  const { t } = useTranslation();
  const [previewUrls, setPreviewUrls] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // Start with empty array

  // Sync initialImages from parent when they change
  useEffect(() => {
    setExistingImages(initialImages);
  }, [initialImages]);

  const onDrop = (acceptedFiles) => {
    const totalFiles = [...uploadedFiles, ...acceptedFiles];
    const totalFileCount = totalFiles.length + existingImages.length;

    if (totalFileCount > maxLength) {
      setMaxLengthError(true);
      setFileError(false);
      return;
    }

    const limitedFiles = totalFiles.slice(0, maxLength - existingImages.length);
    setUploadedFiles(limitedFiles);
    setUploadedFile(limitedFiles[0] || null);
    setPreviewUrls(limitedFiles.map((file) => URL.createObjectURL(file)));
    setMaxLengthError(false);
    setFileError(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: maxLength,
  });

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleRemoveNewFile = (fileToRemove) => {
    const updated = uploadedFiles.filter((file) => file !== fileToRemove);
    setUploadedFiles(updated);
    setUploadedFile(updated[0] || null);
    setPreviewUrls(updated.map((file) => URL.createObjectURL(file)));
    setFileError(updated.length === 0 && existingImages.length === 0);
    setMaxLengthError(false);
  };

  const handleRemoveExistingImage = (imgUrl) => {
    const updated = existingImages.filter((url) => url !== imgUrl);
    setExistingImages(updated);
    setFileError(updated.length === 0 && uploadedFiles.length === 0);
    setMaxLengthError(false);
  };

  //console.log("existingImages", existingImages);

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${
            fileError || maxLengthError ? "red" : "#adbcff"
          }`,
          padding: "0 20px 20px",
          cursor: "pointer",
          textAlign: "center",
          borderRadius: "16px",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>{t("drop_file_here")}</p>
        ) : (
          <div className="flex flex-col gap-[0px] items-center justify-center">
            <div className="w-[150px]">
              <Lottie animationData={uploadIcon} loop />
            </div>
            <p className="upload_input_text">
              {uploadedFiles.length > 0
                ? uploadedFiles.map((file) => file.name).join(", ")
                : t("drag_drop_or_click_upload")}
            </p>
          </div>
        )}
      </div>

      {/* Show existing images */}
      {existingImages.length > 0 && (
        <div className="flex gap-4 mt-5">
          {existingImages.map((imgUrl, idx) => (
            <div key={idx} className="relative group w-[20%]">
              <img
                src={imgUrl}
                alt={`Room image ${idx + 1}`}
                className="w-full h-[180px] object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(imgUrl)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded cursor-pointer"
              >
                {t("remove")}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Show newly uploaded preview files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-5 flex flex-col gap-3">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="bg-[#f8fafb] border border-[#dfdfdf] p-3 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={previewUrls[index]}
                  alt="Preview"
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="text-sm">{file.name}</div>
              </div>
              {/* <button
                type="button"
                onClick={() => handleRemoveNewFile(file)}
                className="text-red-500 text-sm"
              >
                {t("remove")}
              </button> */}
              <div
                onClick={() => handleRemoveNewFile(file)}
                className="cursor-pointer"
              >
                <img src={Images.deleteIcon} alt="delete icon" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadFile;

// import React, { useState, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import Lottie from "lottie-react";
// import uploadIcon from "../../../../assets/images/json/upload.json";
// import Images from "../../../../assets/Images/Images";

// const UploadFile = ({
//   uploadedFiles,
//   setUploadedFiles,
//   setUploadedFile,
//   fileError,
//   setFileError,
//   maxLength = 5,
//   maxLengthError,
//   setMaxLengthError,
//   initialImages = [],
//   setExistingImagesFromUpload,
// }) => {
//   const [newFile, setNewFile] = useState(null);
//   const [filePreviewUrl, setFilePreviewUrl] = useState(null);
//   const [imageList, setImageList] = useState(initialImages);

//   useEffect(() => {
//     setImageList(initialImages);
//   }, [initialImages]);

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     const newFiles = Array.from(files);
//     if (newFiles.length + uploadedFiles.length > maxLength) {
//       setMaxLengthError(true);
//       return;
//     } else {
//       setMaxLengthError(false);
//     }
//     setUploadedFiles((prev) => [...prev, ...newFiles]);
//   };

//   const handleFileRemove = (index) => {
//     setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     onDrop: (acceptedFiles) => {
//       if (acceptedFiles.length + uploadedFiles.length > maxLength) {
//         setMaxLengthError(true);
//         return;
//       } else {
//         setMaxLengthError(false);
//       }

//       setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
//     },
//   });

//   useEffect(() => {
//     setExistingImagesFromUpload(imageList); // Pass existing images to parent
//   }, [imageList]);

//   return (
//     <div className="upload-container">
//       {/* Existing Images Preview */}
//       <div className="existing-images">
//         {imageList?.map((image, index) => (
//           <div key={index} className="image-preview">
//             <img src={image} alt="uploaded" className="h-20 w-20 rounded-md" />
//             <button
//               type="button"
//               onClick={() => handleFileRemove(index)}
//               className="remove-btn"
//             >
//               <img
//                 src={Images.removeIcon} // Ensure you have a remove icon in your Images
//                 alt="remove"
//                 className="h-6 w-6"
//               />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Dropzone / Upload Area */}
//       <div className="dropzone-area" {...getRootProps()}>
//         <input {...getInputProps()} />
//         <Lottie
//           animationData={uploadIcon}
//           loop={true}
//           className="upload-animation"
//         />
//         <p className="upload-text">
//           {filePreviewUrl ? "Preview Image" : "Drag & Drop or Click to Upload"}
//         </p>
//       </div>

//       {/* Upload Button */}
//       <div className="upload-button mt-4">
//         <input
//           type="file"
//           id="fileInput"
//           className="file-input"
//           onChange={handleFileChange}
//           accept="image/*"
//           multiple
//         />
//         <label htmlFor="fileInput" className="upload-btn">
//           {filePreviewUrl ? (
//             <img src={filePreviewUrl} alt="preview" className="h-24 w-24" />
//           ) : (
//             <span className="ml-2">Upload Image</span>
//           )}
//         </label>
//       </div>

//       {/* Error messages */}
//       {fileError && <p className="error-text">Please upload files</p>}
//       {maxLengthError && (
//         <p className="error-text">Maximum file limit of {maxLength} exceeded</p>
//       )}
//     </div>
//   );
// };

// export default UploadFile;
