import { TiUserOutline } from 'react-icons/ti';
import { Avatar } from 'antd';
import { IoIosNotificationsOutline } from 'react-icons/io';
const Header: React.FC = () => {
    let user = window.localStorage.getItem("userData")
    let jsonUser = null
    if (user) {
        jsonUser = JSON.parse(user)
    }
    return (

        <div className='w-full flex items-center justify-between bg-gray-200 text-black py-6'>
            <h1 className='text-xl font-bold'>
                Hi,  {jsonUser ? jsonUser?.name : "User"}. Welcome back!
            </h1>
            <div className='flex items-center'>
                <div className='flex items-center'>
                    <Avatar shape="square" size={'large'} icon={<TiUserOutline />} />
                    <div className='flex flex-col mx-3'>
                        <p className='py-0 text-sm font-bold'>
                      {jsonUser ? jsonUser?.name : "User"}      
                        </p>
                        <p className='py-0 text-sm'>
                            admin
                        </p>
                    </div>
                </div>

                <div className='lg:mx-10 mx-2 shadow-2xl border rounded p-1'>
                    <IoIosNotificationsOutline className='h-6 w-6' />
                </div>

            </div>

        </div>
    );
}
export default Header;
