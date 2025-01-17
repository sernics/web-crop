'use client';

import { useState } from 'react';

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (image) {
      const base64 = image.split(',')[1]; // Remove the base64 URI prefix
      console.log(base64);
      setMessage("Loading...");
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64 }),
        });    
        const data = await response.json();
        setMessage(data.healthy);
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    } else {
      alert('No image selected.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Section title="Computerized Recognition Of Plants diseases" className="w-3/4 border-2 border-[#697565] p-6 rounded-lg text-center" />
      <SmallSection title="Upload an image of the plant you want to evaluate, and the system will indicate if the plant has any disease." className="w-3/4 max-w-full border-2 border-[#697565] p-6 rounded-lg text-center" />

      <div className="w-3/4 max-w-full border-2 border-[#697565] p-6 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          {image ? (
            <img
              src={image}
              alt="Image upload"
              className="w-full max-w-md h-auto rounded-lg"
            />
          ) : (
            <Placeholder />
          )}

          <ImageUploadInput onChange={handleImageUpload} />
          <SaveButton onClick={handleSaveImage} message={message} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, className }: { title: string; className: string }) {
  return (
    <div className={className}>
      <h1 className="text-4xl sm:text-4xl font-bold" style={{ color: '#1e201e' }}>
        {title}
      </h1>
    </div>
  );
}

function SmallSection({ title, className }: { title: string; className: string }) {
  return (
    <div className={className}>
      <h1 className="text-xl sm:text-xl font-bold" style={{ color: '#1e201e' }}>
        {title}
      </h1>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="w-full h-64 flex justify-center items-center rounded-lg" style={{ backgroundColor: '#ecdfcc' }}>
      <span style={{ color: '#1e201e' }}>No image selected</span>
    </div>
  );
}

function ImageUploadInput({ onChange }: { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      className="block w-full text-sm 
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-gray-200 file:text-gray-700
        hover:file:bg-gray-300" style={{ color: '#697565', fontWeight: 'bold' }}
    />
  );
}

function SaveButton({ onClick, message }: { onClick: () => void; message: string }) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Upload Image
      </button>
      <span>{message}</span>
    </div>
  );
}
