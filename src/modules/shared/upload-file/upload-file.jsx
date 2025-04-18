import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import Lottie from "lottie-react";
import uploadIcon from "../../../assets/images/json/upload.json";
import Images from "../../../assets/Images/Images";

const UploadFile = ({
  uploadedFiles,
  setUploadedFiles,
  //uploadedFile,
  setUploadedFile,
  fileError,
  setFileError,
  maxLength = 5, // Default to 5 files if no maxLength is passed
  maxLengthError,
  setMaxLengthError,
}) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const { t } = useTranslation();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length + uploadedFiles.length > maxLength) {
      setMaxLengthError(true); // Set max length error flag
      setFileError(false); // Reset other error flag
      return; // Don't update the files if the limit is exceeded
    }

    const totalFiles = [...uploadedFiles, ...acceptedFiles].slice(0, maxLength); // Limit to maxLength files
    setUploadedFiles(totalFiles);
    setUploadedFile(totalFiles[0] || null);
    setPreviewUrls(totalFiles.map((file) => URL.createObjectURL(file)));
    setMaxLengthError(false); // Clear max length error
    setFileError(false); // Clear file error if files are valid
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

  const handleRemoveFile = (fileToRemove) => {
    const updatedFiles = uploadedFiles.filter((file) => file !== fileToRemove);
    const updatedPreviews = updatedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setUploadedFiles(updatedFiles);
    setUploadedFile(updatedFiles[0] || null);
    setPreviewUrls(updatedPreviews);
    setMaxLengthError(false); // Clear max length error when files are removed
    setFileError(updatedFiles.length === 0); // Set file error if no files are left
  };

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
              <Lottie animationData={uploadIcon} loop={true} />
            </div>
            <p className="upload_input_text">
              {uploadedFiles.length > 0
                ? uploadedFiles.map((file) => file.name).join(", ")
                : t("drag_drop_or_click_upload")}
            </p>
          </div>
        )}
      </div>

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
                <div>
                  {file.name.length > 20
                    ? `${file.name.substring(0, 20)}...`
                    : file.name}
                </div>
              </div>
              <div
                onClick={() => handleRemoveFile(file)}
                className="cursor-pointer"
              >
                <img src={Images.deleteIcon} alt="delete icon" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display error messages */}
      {/* {fileError && !maxLengthError && (
        <p className="mt-2 text-[#ff3728] text-[14px] font-[500]">
          {t("image_required")}
        </p>
      )}
      {maxLengthError && !fileError && (
        <p className="mt-2 text-[#ff3728] text-[14px] font-[500]">
          {t("max_files_error", { maxLength })}
        </p>
      )} */}
    </div>
  );
};

export default UploadFile;


// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useDropzone } from "react-dropzone";
// import Lottie from "lottie-react";
// import uploadIcon from "../../../assets/images/json/upload.json";
// import Images from "../../../assets/Images/Images";

// const UploadFile = ({
//   uploadedFiles,
//   setUploadedFiles,
//   uploadedFile,
//   setUploadedFile,
//   fileError,
//   setFileError,
// }) => {
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const { t } = useTranslation();

//   const onDrop = (acceptedFiles) => {
//     setUploadedFiles(acceptedFiles); // Update the list of uploaded files
//     setUploadedFile(acceptedFiles[0]); // Update uploadedFile (only first file if multiple)
//     setPreviewUrls(acceptedFiles.map((file) => URL.createObjectURL(file))); // Create preview URLs for each file
//     setFileError(false); // Clear any error when file is selected
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   useEffect(() => {
//     return () => {
//       // Clean up preview URLs when component is unmounted
//       previewUrls.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [previewUrls]);

//   const handleRemoveFile = (file) => {
//     const updatedFiles = uploadedFiles.filter((f) => f !== file);
//     const updatedPreviews = previewUrls.filter(
//       (url) => url !== URL.createObjectURL(file)
//     );
//     setUploadedFiles(updatedFiles);
//     setPreviewUrls(updatedPreviews);
//     setUploadedFile(null); // Reset uploadedFile
//     setFileError(true); // Set error if no file is uploaded
//   };

//   return (
//     <div className="">
//       <div
//         {...getRootProps()}
//         style={{
//           border: `2px dashed ${fileError ? "red" : "#adbcff"}`,
//           padding: "0 20px 20px",
//           cursor: "pointer",
//           textAlign: "center",
//           borderRadius: "16px",
//         }}
//       >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>{t("drop_file_here")}</p>
//         ) : (
//           <div className="flex flex-col gap-[0px] items-center justify-center">
//             <div className="w-[150px]">
//               <Lottie animationData={uploadIcon} loop={true} />
//             </div>
//             <p className="upload_input_text">
//               {uploadedFiles.length > 0
//                 ? uploadedFiles.map((file) => file.name).join(", ")
//                 : t("drag_drop_or_click_upload")}
//             </p>
//           </div>
//         )}
//       </div>

//       {uploadedFiles.length > 0 && (
//         <div className="mt-5 text-center">
//           {previewUrls.map((previewUrl, index) => (
//             <div
//               key={index}
//               className="bg-[#f8fafb] border border-[#dfdfdf] p-3 rounded-lg flex items-center justify-between"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={previewUrl}
//                   alt="Preview"
//                   width={60}
//                   height={60}
//                   className="rounded"
//                 />
//                 <div>
//                   {uploadedFiles[index].name.length > 20
//                     ? `${uploadedFiles[index].name.substring(0, 20)}...`
//                     : uploadedFiles[index].name}
//                 </div>
//               </div>
//               <div
//                 onClick={() => handleRemoveFile(uploadedFiles[index])}
//                 className="cursor-pointer"
//               >
//                 <img src={Images.deleteIcon} alt="delete icon" />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* {fileError && (
//         <p className="mt-1 text-[#ff3728] text-[14px] font-[500]">
//           {t("file_required")}
//         </p>
//       )} */}
//     </div>
//   );
// };

// export default UploadFile;
