// import React, { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import { FaCamera, FaUpload } from "react-icons/fa";

// const VirtualTryOn = () => {
//   const [selectedGlasses, setSelectedGlasses] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [isWebcamActive, setIsWebcamActive] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Load face-api.js models on component mount
//   useEffect(() => {
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//       await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
//     };
//     loadModels();
//   }, []);

//   // Start webcam feed
//   const startWebcam = () => {
//     setIsWebcamActive(true);
//     navigator.mediaDevices
//       .getUserMedia({ video: {} })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("Error accessing webcam: ", err));
//   };

//   // Detect face in webcam feed and draw glasses
//   useEffect(() => {
//     if (!isWebcamActive) return;

//     const detectFace = async () => {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const displaySize = { width: video.width, height: video.height };

//       faceapi.matchDimensions(canvas, displaySize);
//       setInterval(async () => {
//         const detections = await faceapi
//           .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks();

//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         const context = canvas.getContext("2d");
//         context.clearRect(0, 0, canvas.width, canvas.height);

//         if (selectedGlasses && resizedDetections.length > 0) {
//           const landmarks = resizedDetections[0].landmarks;
//           drawGlasses(landmarks, canvas);
//         }
//       }, 100);
//     };

//     detectFace();
//   }, [isWebcamActive, selectedGlasses]);

//   // Draw glasses based on facial landmarks
//   const drawGlasses = (landmarks, canvas) => {
//     const ctx = canvas.getContext("2d");
//     const leftEye = landmarks.getLeftEye();
//     const rightEye = landmarks.getRightEye();

//     const glassesWidth = Math.abs(rightEye[0].x - leftEye[0].x) * 2;
//     const glassesHeight = glassesWidth / 2;

//     const glassesX = leftEye[0].x - glassesWidth / 4;
//     const glassesY = leftEye[0].y - glassesHeight / 2;

//     const img = new Image();
//     img.src = selectedGlasses;

//     img.onload = () => {
//       ctx.drawImage(img, glassesX, glassesY, glassesWidth, glassesHeight);
//     };
//   };

//   // Handle file upload (user can upload an image)
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImage(reader.result);
//         setIsWebcamActive(false); // Disable webcam when uploading an image
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle glasses selection
//   const selectGlasses = (glassesPath) => {
//     setSelectedGlasses(glassesPath);
//   };

//   return (
//     <div className="py-10 bg-gray-100">
//       <div className="container mx-auto">
//         <h2 className="text-center text-4xl font-bold mb-8 text-[#2d899c]">Virtual Try-On</h2>

//         {/* Glasses Selector */}
//         <div className="flex justify-center mb-8">
//           <button
//             className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-2"
//             onClick={() => selectGlasses("path-to-glasses1.png")}
//           >
//             Select Glasses 1
//           </button>
//           <button
//             className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-2"
//             onClick={() => selectGlasses("path-to-glasses2.png")}
//           >
//             Select Glasses 2
//           </button>
//           <button
//             className="bg-gray-800 text-white px-4 py-2 rounded-lg"
//             onClick={() => selectGlasses("path-to-glasses3.png")}
//           >
//             Select Glasses 3
//           </button>
//         </div>

//         {/* Webcam and Upload Buttons */}
//         <div className="flex justify-center space-x-4 mb-8">
//           <button
//             onClick={startWebcam}
//             className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
//           >
//             <FaCamera className="mr-2" />
//             Start Webcam
//           </button>
//           <label className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">
//             <FaUpload className="mr-2" />
//             Upload Image
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFileUpload}
//             />
//           </label>
//         </div>

//         {/* Webcam or Uploaded Image Display */}
//         <div className="relative w-full max-w-lg mx-auto">
//           {isWebcamActive ? (
//             <>
//               <video
//                 ref={videoRef}
//                 className="w-full h-auto rounded-lg"
//                 autoPlay
//                 muted
//               ></video>
//               <canvas
//                 ref={canvasRef}
//                 className="absolute top-0 left-0 w-full h-full"
//               ></canvas>
//             </>
//           ) : uploadedImage ? (
//             <>
//               <img
//                 src={uploadedImage}
//                 alt="Uploaded"
//                 className="w-full h-auto rounded-lg"
//               />
//               <canvas
//                 ref={canvasRef}
//                 className="absolute top-0 left-0 w-full h-full"
//               ></canvas>
//             </>
//           ) : (
//             <p className="text-center text-gray-500">No webcam or image loaded.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VirtualTryOn;





import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { FaCamera, FaUpload } from "react-icons/fa";

const VirtualTryOn = () => {
  const [glassesCollection, setGlassesCollection] = useState([]);
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load face-api.js models on component mount
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    };
    loadModels();
  }, []);

  // Fetch glasses data from API
  useEffect(() => {
    const fetchGlasses = async () => {
      try {
        const response = await fetch("http//localhost:4000/api/v1/spectacles"); // Replace with your API endpoint
        const data = await response.json();
        setGlassesCollection(data);
      } catch (error) {
        console.error("Error fetching glasses:", error);
      }
    };
    fetchGlasses();
  }, []);

  // Start webcam feed
  const startWebcam = () => {
    setIsWebcamActive(true);
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  // Detect face in webcam feed and draw glasses
  useEffect(() => {
    if (!isWebcamActive) return;

    const detectFace = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const displaySize = { width: video.width, height: video.height };

      faceapi.matchDimensions(canvas, displaySize);
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (selectedGlasses && resizedDetections.length > 0) {
          const landmarks = resizedDetections[0].landmarks;
          drawGlasses(landmarks, canvas);
        }
      }, 100);
    };

    detectFace();
  }, [isWebcamActive, selectedGlasses]);

  // Draw glasses based on facial landmarks
  const drawGlasses = (landmarks, canvas) => {
    const ctx = canvas.getContext("2d");
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();

    const glassesWidth = Math.abs(rightEye[0].x - leftEye[0].x) * 2;
    const glassesHeight = glassesWidth / 2;

    const glassesX = leftEye[0].x - glassesWidth / 4;
    const glassesY = leftEye[0].y - glassesHeight / 2;

    const img = new Image();
    img.src = selectedGlasses;

    img.onload = () => {
      ctx.drawImage(img, glassesX, glassesY, glassesWidth, glassesHeight);
    };
  };

  // Handle file upload (user can upload an image)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setIsWebcamActive(false); // Disable webcam when uploading an image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle glasses selection
  const selectGlasses = (glassesPath) => {
    setSelectedGlasses(glassesPath);
  };

  return (
    <div className="py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold mb-8 text-[#2d899c]">Virtual Try-On</h2>

        {/* Glasses Selector */}
        <div className="flex justify-center mb-8">
          {glassesCollection.map((glasses) => (
            <div
              key={glasses.id} // Assuming each glasses object has an 'id'
              className="bg-white shadow-md rounded-lg p-4 mx-2 cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => selectGlasses(glasses.imagePath)} // Assuming each glasses object has an 'imagePath'
            >
              <img src={glasses.imagePath} alt={glasses.name} className="w-32 h-16 object-cover mb-2" />
              <p className="text-center text-lg font-semibold">{glasses.name}</p>
            </div>
          ))}
        </div>

        {/* Webcam and Upload Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={startWebcam}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            <FaCamera className="mr-2" />
            Start Webcam
          </button>
          <label className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">
            <FaUpload className="mr-2" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* Webcam or Uploaded Image Display */}
        <div className="relative w-full max-w-lg mx-auto">
          {isWebcamActive ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-auto rounded-lg"
                autoPlay
                muted
              ></video>
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
              ></canvas>
            </>
          ) : uploadedImage ? (
            <>
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-auto rounded-lg"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
              ></canvas>
            </>
          ) : (
            <p className="text-center text-gray-500">No webcam or image loaded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
