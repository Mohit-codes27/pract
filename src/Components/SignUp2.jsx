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

    const toggleSelection = (value, selectedList, setSelectedList, fieldName) => {
        const updatedList = selectedList.includes(value)
            ? selectedList.filter((item) => item !== value)
            : [...selectedList, value];
        setSelectedList(updatedList);
        setValue(fieldName, updatedList.join(',')); // Update the form value
    };

    const createAccount = async (data) => {
        setError("");
        if (!data.gender || !data.languages || !data.type) {
            setError("Please fill all required fields.");
            return;
        }

        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                dispatch(login(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message || "An error occurred during sign-up.");
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
                            <div className={`w-1/2 h-2 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                            <div className={`w-1/2 h-2 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        </div>
                        <p className="text-center mt-2 text-gray-600">Step {step} of 2</p>
                    </div>

                    <form className="flex flex-col" onSubmit={handleSubmit(createAccount)}>
                        {step === 1 && (
                            <>
                                <Input
                                    label="Name"
                                    placeholder="Enter Your Name"
                                    type="text"
                                    {...register("name", { required: "Name is required." })}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                                <Input
                                    label="Email"
                                    placeholder="Enter Your Email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Invalid email address.",
                                        },
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Create Your Password"
                                    {...register("password", { required: "Password is required." })}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    placeholder="Enter Your Phone Number"
                                    {...register("phone", { required: "Phone number is required." })}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700">City</label>
                                    <select
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        {...register("city", { required: "City is required." })}
                                    >
                                        <option value="">Select City</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Bangalore">Bangalore</option>
                                    </select>
                                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-lg font-semibold text-gray-800 mb-2">Gender</label>
                                    <div className="flex gap-4">
                                        {['Female', 'Male', 'Others'].map((gender) => (
                                            <button
                                                key={gender}
                                                type="button"
                                                className={`px-4 py-2 border rounded-full ${watch('gender') === gender
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                                onClick={() => setValue('gender', gender)}
                                            >
                                                {gender}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="hidden"
                                        {...register('gender', { required: "Please select your gender." })}
                                    />
                                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Languages you know</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['English', 'Hindi', 'Telugu', 'Tamil', 'Marathi', 'French', 'Japanese'].map((language) => (
                                            <button
                                                key={language}
                                                type="button"
                                                className={`px-4 py-2 border rounded-full ${selectedLanguages.includes(language)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                                onClick={() =>
                                                    toggleSelection(language, selectedLanguages, setSelectedLanguages, 'languages')
                                                }
                                            >
                                                {language}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="hidden"
                                        value={selectedLanguages.join(',')}
                                        {...register('languages', { required: "Please select at least one language." })}
                                    />
                                    {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Type</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['College Student', 'Fresher', 'Working Professional', 'School Student', 'Woman returning to work'].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                className={`px-4 py-2 border rounded-full ${selectedType.includes(type)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                                onClick={() =>
                                                    toggleSelection(type, selectedType, setSelectedType, 'type')
                                                }
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="hidden"
                                        value={selectedType.join(',')}
                                        {...register('type', { required: "Please select at least one type." })}
                                    />
                                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
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
