import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function SignUp2() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedType, setSelectedType] = useState([]);


    const toggleLanguageSelection = (language) => {
        const updatedLanguages = selectedLanguages.includes(language)
            ? selectedLanguages.filter((lang) => lang !== language)
            : [...selectedLanguages, language];
        setSelectedLanguages(updatedLanguages);
        setValue('languages', updatedLanguages.join(',')); // Update the form value
    };
    
    const toggleTypeSelection = (type) => {
        const updatedTypes = selectedType.includes(type)
            ? selectedType.filter((ty) => ty !== type)
            : [...selectedType, type];
        setSelectedType(updatedTypes);
        setValue('type', updatedTypes.join(',')); // Update the form value
    };
    
    const create = async (data) => {
        setError("");
        console.log("Form Data Submitted:", data); // Debug: Log form data before submission
        if (!data.gender || !data.languages || !data.type) {
            setError("Please fill all required fields.");
            return;
        }
    
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(login(user));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message || "An error occurred during sign up.");
        }
    };
    
    


    const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-800">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center mb-4">Sign up as an Employee</h2>
                    <p className="text-center text-gray-500 mb-6">
                        Already have an account?{' '}
                        <Link className="text-blue-600 hover:underline" to="/login">
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                    <div className="mb-6">
                        <div className="flex items-center justify-center gap-4">
                            <div
                                className={`w-1/2 h-2 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}
                            ></div>
                            <div
                                className={`w-1/2 h-2 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-300'}`}
                            ></div>
                        </div>
                        <p className="text-center mt-2 text-gray-600">
                            Step {step} of 2
                        </p>
                    </div>

                    <form className="flex flex-col" onSubmit={handleSubmit(create)}>
                        {step === 1 && (
                            <>
                                <Input
                                    label="Name"
                                    placeholder="Enter Your Name"
                                    className=""
                                    type="text"
                                    {...register("name", { required: true })}
                                />

                                <Input
                                    label="Email"
                                    placeholder="Enter Your Email"
                                    className=""
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPattern: (value) =>
                                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email",
                                        },
                                    })}
                                />

                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Create Your Password"
                                    className=""
                                    {...register("password", { required: true })}
                                />

                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    placeholder="Enter Your Phone Number"
                                    className=""
                                    {...register("phone", { required: true })}
                                />
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700">City</label>
                                    <select
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        {...register("city", { required: true })}
                                    >
                                        <option value="">Select City</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Bangalore">Bangalore</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-lg font-semibold text-gray-800 mb-2">Gender</label>
                                    <div className="flex gap-4">
                                        {['Female', 'Male', 'Others'].map((gender) => (
                                            <button
                                                key={gender}
                                                type="button"
                                                className={`flex items-center gap-2 px-4 py-2 border rounded-full ${watch('gender') === gender
                                                        ? 'bg-blue-600 text-white' // Highlight selected
                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-300`}
                                                onClick={() => setValue('gender', gender)} // Update the gender value
                                            >
                                                <img
                                                    src={
                                                        gender === 'Female'
                                                            ? 'https://static.vecteezy.com/system/resources/previews/017/178/227/non_2x/female-symbol-isolated-icon-on-transparent-background-free-png.png'
                                                            : gender === 'Male'
                                                                ? 'https://static.vecteezy.com/system/resources/previews/017/178/570/non_2x/male-symbol-isolated-icon-on-transparent-background-free-png.png'
                                                                : 'https://img.icons8.com/emoji/48/000000/star-emoji.png'
                                                    }
                                                    alt={gender}
                                                    className="w-5 h-5"
                                                />
                                                {gender}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Hidden input to track the selected gender */}
                                    <input
                                        type="hidden"
                                        {...register('gender', { required: 'Please select your gender.' })}
                                    />
                                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                                </div>



                                <div className="mb-4 w-[80%]">
                                    <label className="block text-gray-700 mb-2">Languages you know</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['English', 'Hindi', 'Telugu', 'Tamil', 'Marathi', 'French', 'Japanese'].map((language) => (
                                            <button
                                                key={language}
                                                type="button"
                                                className={`px-4 py-2 border rounded-full ${selectedLanguages.includes(language)
                                                    ? 'bg-blue-600 text-white' // Highlight selected
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                    } focus:outline-none focus:ring focus:ring-blue-300`}
                                                onClick={() => toggleLanguageSelection(language)}
                                            >
                                                {language}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Hidden input to track the selected languages */}
                                    <input
                                        type="hidden"
                                        value={selectedLanguages.join(',')}
                                        {...register('languages', { required: true })}
                                    />
                                </div>

                                <div className="mb-4 w-[80%]">
                                    <label className="block text-gray-700 mb-2">Type</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['College Student', 'Fresher', 'Working Professional', 'School Student', 'Woman returning to work'].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                className={`px-4 py-2 border rounded-full ${selectedType.includes(type)
                                                    ? 'bg-blue-600 text-white' // Highlight selected
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                    } focus:outline-none focus:ring focus:ring-blue-300`}
                                                onClick={() => toggleTypeSelection(type)}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Hidden input to track the selected types */}
                                    <input
                                        type="hidden"
                                        value={selectedType.join(',')}
                                        {...register('type', { required: true })}
                                    />
                                </div>


                            </>
                        )}

                        <div className="flex justify-between">
                            {step > 1 && (
                                <Button
                                    type="button"
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                                    onClick={prevStep}
                                >
                                    Previous
                                </Button>
                            )}

                            {step < 2 ? (
                                <Button
                                    type="button"
                                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    onClick={nextStep}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp2;
