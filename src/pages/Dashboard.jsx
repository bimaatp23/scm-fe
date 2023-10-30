import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

const Dashboard = () => {
    return(
        <div className='grid grid-cols-6 relative'>
            <Sidebar/>
            <div className='col-span-5 w-full p-8'>
                <h1 className='text-left text-4xl font-bold text-sky-700'>
                    Dashboard
                </h1>
                <div className='grid gap-4'>
                    <div className='bg-sky-100 h-64 rounded-2xl mt-12'></div>
                    <div className='bg-sky-100 h-64 rounded-2xl'></div>
                    <div className='bg-sky-100 h-64 rounded-2xl'></div>
                    <div className='bg-sky-100 h-64 rounded-2xl'></div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard