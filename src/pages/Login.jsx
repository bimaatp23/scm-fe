import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan validasi atau kirim data login ke server di sini
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-sky-700">
      <form className="bg-white shadow-md rounded-md w-80 p-4 sm:w-96 sm:p-6" onSubmit={handleSubmit}>
        <h1 className='text-2xl font-bold mb-4 sm:text-3xl sm:mb-6'>Login</h1>
        <div className="mt-2 mb-4">
          <label className="flex justify-start text-base font-semibold mb-2 ml-1 sm:text-lg" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label className="flex justify-start text-base font-semibold mb-2 ml-1 sm:text-lg" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex justify-between mb-4 px-1'>
            <div>
                <input type="checkbox" />
                <label className='ml-1' htmlFor="">Remember me</label>
            </div>
            <div className='text-decoration-line: underline hover:text-gray-700'>
                <a href="#">Forgot Password?</a>
            </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-sky-700 hover:bg-sky-500 text-white text-base font-bold py-2 px-4 mt-2 rounded sm:text-lg focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
