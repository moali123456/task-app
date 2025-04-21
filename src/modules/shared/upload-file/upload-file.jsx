// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useDropzone } from "react-dropzone";
// import Lottie from "lottie-react";
// import uploadIcon from "../../../assets/images/json/upload.json";
// import Images from "../../../assets/Images/Images";

// const UploadFile = ({
//   uploadedFiles,
//   setUploadedFiles,
//   //uploadedFile,
//   setUploadedFile,
//   fileError,
//   setFileError,
//   maxLength = 5, // Default to 5 files if no maxLength is passed
//   maxLengthError,
//   setMaxLengthError,
// }) => {
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const { t } = useTranslation();

//   const onDrop = (acceptedFiles) => {
//     if (acceptedFiles.length + uploadedFiles.length > maxLength) {
//       setMaxLengthError(true); // Set max length error flag
//       setFileError(false); // Reset other error flag
//       return; // Don't update the files if the limit is exceeded
//     }

//     const totalFiles = [...uploadedFiles, ...acceptedFiles].slice(0, maxLength); // Limit to maxLength files
//     setUploadedFiles(totalFiles);
//     setUploadedFile(totalFiles[0] || null);
//     setPreviewUrls(totalFiles.map((file) => URL.createObjectURL(file)));
//     setMaxLengthError(false); // Clear max length error
//     setFileError(false); // Clear file error if files are valid
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     maxFiles: maxLength,
//   });

//   useEffect(() => {
//     return () => {
//       previewUrls.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [previewUrls]);

//   const handleRemoveFile = (fileToRemove) => {
//     const updatedFiles = uploadedFiles.filter((file) => file !== fileToRemove);
//     const updatedPreviews = updatedFiles.map((file) =>
//       URL.createObjectURL(file)
//     );
//     setUploadedFiles(updatedFiles);
//     setUploadedFile(updatedFiles[0] || null);
//     setPreviewUrls(updatedPreviews);
//     setMaxLengthError(false); // Clear max length error when files are removed
//     setFileError(updatedFiles.length === 0); // Set file error if no files are left
//   };

//   return (
//     <div>
//       <div
//         {...getRootProps()}
//         style={{
//           border: `2px dashed ${
//             fileError || maxLengthError ? "red" : "#adbcff"
//           }`,
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
//         <div className="mt-5 flex flex-col gap-3">
//           {uploadedFiles.map((file, index) => (
//             <div
//               key={index}
//               className="bg-[#f8fafb] border border-[#dfdfdf] p-3 rounded-lg flex items-center justify-between"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={previewUrls[index]}
//                   alt="Preview"
//                   width={60}
//                   height={60}
//                   className="rounded"
//                 />
//                 <div>
//                   {file.name.length > 20
//                     ? `${file.name.substring(0, 20)}...`
//                     : file.name}
//                 </div>
//               </div>
//               <div
//                 onClick={() => handleRemoveFile(file)}
//                 className="cursor-pointer"
//               >
//                 <img src={Images.deleteIcon} alt="delete icon" />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadFile;

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { CameraIcon, TrashIcon } from "@heroicons/react/24/outline";
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
          border: `1px solid ${
            fileError || maxLengthError ? "red" : "#f5f6f8"
          }`,
          width: "114px",
          height: "114px",
          cursor: "pointer",
          textAlign: "center",
          borderRadius: "50%",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="w-28 h-28 rounded-full bg-[#f5f6f8] flex items-center justify-center">
            <p>{t("drop_file_here")}</p>
          </div>
        ) : (
          <div className="w-28 h-28 rounded-full bg-[#f5f6f8] flex items-center justify-center">
            <CameraIcon className="size-12" />

            {uploadedFiles.length > 0 && (
              <div className="flex flex-col gap-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="w-28 h-28 rounded-full bg-[#f5f6f8] flex items-center justify-center relative"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={previewUrls[index]}
                        alt="Preview"
                        className="rounded-full w-28 h-28"
                      />
                    </div>
                    <div
                      onClick={() => handleRemoveFile(file)}
                      className="cursor-pointer absolute w-28 h-28 rounded-full bg-[rgba(0,0,0,0.4)] flex items-center justify-center"
                    >
                      <TrashIcon className="size-8 text-white" />
                      {/* <img src={Images.deleteIcon} alt="delete icon" /> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          // <div className="flex flex-col gap-[0px] items-center justify-center">
          //   <div className="w-[150px]">
          //     <Lottie animationData={uploadIcon} loop={true} />
          //   </div>
          //   <p className="upload_input_text">
          //     {uploadedFiles.length > 0
          //       ? uploadedFiles.map((file) => file.name).join(", ")
          //       : t("drag_drop_or_click_upload")}
          //   </p>
          // </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
