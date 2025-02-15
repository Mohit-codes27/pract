import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({
        company: "",
        work: "",
        role: "",
    });

    const handleSelection = (key, value) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [key]: prev[key] === value ? "" : value, // Toggle selection
        }));
        setValue(key, value); // Update react-hook-form value
    };

    const createAccount = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount({
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                city: data.city,
                company: selectedOptions.company, // Single string value
                work: selectedOptions.work,       // Single string value
                role: selectedOptions.role,       // Single string value
                address: data.address,
            });

            if (userData) {
                dispatch(login(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message || "Something went wrong. Please try again.");
        }
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#0a66c2]">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center mb-4">Sign up as an Employer</h2>
                    <p className="text-center text-gray-500 mb-6">
                        Already have an account?{' '}
                        <Link className="text-blue-600 hover:underline" to="/login">
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                    <div className="mb-6">
                        <div className="flex items-center justify-center gap-4">
                            <div className={`w-1/2 h-2 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <div className={`w-1/2 h-2 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                        </div>
                        <p className="text-center mt-2 text-gray-600">Step {step} of 2</p>
                    </div>

                    <form className="flex flex-col" onSubmit={handleSubmit(createAccount)}>
                        {step === 1 && (
                            <>
                                <Input label="Name" placeholder="Enter Your Name" type="text" {...register("name", { required: true })} />
                                <Input label="Email" placeholder="Enter Your Email" type="email" {...register("email", { required: true })} />
                                <Input label="Password" type="password" placeholder="Create Your Password" {...register("password", { required: true })} />
                                <Input label="Phone Number" type="tel" placeholder="Enter Your Phone Number" {...register("phone", { required: true })} />
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700">City</label>
                                    <select className="w-full p-2 border rounded" {...register("city", { required: true })}>
                                        <option value="">Select City</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Bangalore">Bangalore</option>
                                    </select>
                                </div>

                                <div className="mb-4 w-[80%]">
                                    <label className="block text-gray-700 mb-2">Type of Company</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Product Based", "Service Based"].map((company) => (
                                            <button
                                                key={company}
                                                type="button"
                                                className={`px-4 py-2 border rounded-full ${selectedOptions.company === company ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                onClick={() => handleSelection("company", company)}
                                            >
                                                {company}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4 w-[80%]">
                                    <label className="block text-gray-700 mb-2">Field of Work</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Technical", "Designing", "Research", "Marketing"].map((field) => (
                                            <button
                                                key={field}
                                                type="button"
                                                className={`px-4 py-2 border rounded-full ${selectedOptions.work === field ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                onClick={() => handleSelection("work", field)}
                                            >
                                                {field}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4 w-[80%]">
                                    <label className="block text-gray-700 mb-2">Kind of Roles</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Intern", "Full Time", "Work from Home", "Work from Office", "Hybrid"].map((role) => (
                                            <button
                                                key={role}
                                                type="button"
                                                className={`px-4 py-2 border rounded-full ${selectedOptions.role === role ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                onClick={() => handleSelection("role", role)}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Input label="Address" placeholder="Company Address" type="text" {...register("address", { required: true })} />
                            </>
                        )}

                        <div className="flex justify-between">
                            {step > 1 && <Button type="button" className="bg-gray-300 text-gray-800 py-2 px-4 rounded" onClick={prevStep}>Previous</Button>}
                            {step < 2 ? (
                                <Button type="button" className="bg-blue-600 text-white py-2 px-4 rounded" onClick={nextStep}>Next</Button>
                            ) : (
                                <Button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting.." : "Submit"}
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
