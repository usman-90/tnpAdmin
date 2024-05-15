import { message } from 'antd';
import BgImage from '../../../public/pic.png'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const handleSubmit = async () => {
        if (formData.password?.length < 1) {
            messageApi.open({
                type: "error",
                content: "Password is required!",
            });
            return;
        } else if (!formData.username) {
            messageApi.open({
                type: "error",
                content: "Email can not be empty",
            });
            return;
        }
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/admin/login", formData);

            window.localStorage.setItem("userData", JSON.stringify(response?.data?.userData))
            console.log("yeah2", response?.data?.userData);
            messageApi.open({
                type: "success",
                content: "Logged in successfully",
            });
            navigate("/")
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Ops! an error occured!"
            });
        }
    };


    return (
        <div className="container overflow-[none] mx-auto">
        {contextHolder}
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <img
                        className="w-[80%] h-[30rem] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        src={BgImage}
                    />
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={formData.username}
                                    name='username'
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    name='password'
                                    placeholder="******************"
                                    value={formData.password}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
