'use client';

import { useState } from 'react';

export default function Page() {
  const [image, setImage] = useState<string | null>(null);

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

  const handleSaveImage = () => {
    if (image) {
      console.log('Imagen guardada:', image); // Aquí podrías enviar la imagen a tu servidor.
      alert('Imagen guardada correctamente.');
    } else {
      alert('No se ha seleccionado ninguna imagen.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Section title="Crop Recognition Of Plants Diseases" className="w-3/4 border-2 border-[#697565] p-6 rounded-lg text-center" />
      <Section title="Suba una imagen de la planta que desee evaluar, y el sistema indicará si la planta tiene alguna enfermedad." className="w-3/4 max-w-full border-2 border-[#697565] p-6 rounded-lg text-center" />

      <div className="w-3/4 max-w-full border-2 border-[#697565] p-6 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          {image ? (
            <img
              src={image}
              alt="Imagen cargada"
              className="w-full max-w-md h-auto rounded-lg"
            />
          ) : (
            <Placeholder />
          )}

          <ImageUploadInput onChange={handleImageUpload} />
          <SaveButton onClick={handleSaveImage} />
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

function Placeholder() {
  return (
    <div className="w-full h-64 flex justify-center items-center rounded-lg" style={{ backgroundColor: '#ecdfcc' }}>
      <span style={{ color: '#1e201e' }}>No se ha seleccionado ninguna imagen</span>
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

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Guardar Imagen
    </button>
  );
}

