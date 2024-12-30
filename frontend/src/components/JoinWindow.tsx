export const JoinWindow = () => {
  
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen items-center bg-gray-500">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-sans text-lg text-white">Enter room code</h1>
          <input className="border rounded-lg p-1 bg-gray-700" type="text" placeholder="Enter room code" />
          <button className="border focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Join</button>
        </div>

        <div>
          <button className="border focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create New Room</button>
        </div>
      </div>
    </>
  );
};
