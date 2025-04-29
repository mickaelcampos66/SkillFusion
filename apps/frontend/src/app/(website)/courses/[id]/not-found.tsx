export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Cours introuvable</h1>
      <p className="text-lg text-gray-600">
        Le cours que vous cherchez n&lsquo;existe pas ou a été supprimé.
      </p>
    </div>
  )
}
