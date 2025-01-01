import Image from "next/image";

export default function Header() {
  return (
    <header className=" py-3 text-xl font-bold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <h1 className="text-4xl font- font-serif">
          CROP
        </h1>
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={48}
          height={48}
          className="h-12 w-auto" /* Ajusta el tamaño del logo */
          style={{ filter: "invert(35%) sepia(12%) saturate(400%) hue-rotate(60deg) brightness(90%) contrast(85%)" }} /* Aplica el color #697565 */
        />
      </div>
    </header>
  );
}