import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = () => {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const getAccessToken = async (email) => {
    try {
      const response = await axios.post("https://micro-task-server-side.vercel.app/jwt", { email });
      if (response.data.token) {
        localStorage.setItem("access-token", response.data.token);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const onSubmit = (data) => {
    const defaultCoins = data.role === "worker" ? 10 : 50;
    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, data.photoURL).then(async () => {
          const userInfo = {
            name: data.name,
            email: data.email,
            role: data.role,
            image: data.photoURL,
            coin: defaultCoins,
          };
          const res = await axios.post("https://micro-task-server-side.vercel.app/users", userInfo);
          if (res.data.insertedId) {
            await getAccessToken(data.email);
            reset();
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: `Welcome! Received ${defaultCoins} coins.`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard");
          }
        });
      })
      .catch((error) =>
        Swal.fire({ icon: "error", title: "Error", text: error.message })
      );
  };


  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        role: "worker",
        image: result.user.photoURL,
        coin: 10,
      };
      axios.post("https://micro-task-server-side.vercel.app/users", userInfo).then(() => {
        getAccessToken(result.user.email);
        navigate("/dashboard");
      });
    });
  };

  return (
    <div className="hero min-h-screen bg-[#1d232a] flex items-center justify-center py-10">
      <div className="hero-content w-full justify-center p-0">
        

        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100 border border-gray-700/50 relative overflow-hidden backdrop-blur-sm">
          
 
          <form onSubmit={handleSubmit(onSubmit)} className="card-body p-8">
            
    
            <div className="text-center mb-6 relative">
              <div className="relative inline-block">
   
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg blur opacity-40 animate-pulse"></div>
                

                <div className="relative w-20 h-20 bg-[#1d232a] rounded-xl border border-blue-500/30 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 tracking-tighter" style={{ fontFamily: 'monospace' }}>
                        MT
                    </span>
                    

                    <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white mt-4 tracking-wide">
                Micro<span className="text-[#3b82f6]">Tasker</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest text-[10px]">Access Control</p>
            </div>

            {/* Name Input */}
            <div className="form-control mb-4">
              <label className="label py-1">
                <span className="label-text text-gray-300 font-medium">Full Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="Name: .........."
                className="input input-bordered bg-[#15191e] text-white border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 h-12 text-base transition-all"
              />
              {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
            </div>

            {/* Email Input */}
            <div className="form-control mb-4">
              <label className="label py-1">
                <span className="label-text text-gray-300 font-medium">Email Address</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="user@example.com"
                className="input input-bordered bg-[#15191e] text-white border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 h-12 text-base transition-all"
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
            </div>

            {/* Photo URL Input */}
            <div className="form-control mb-4">
              <label className="label py-1">
                <span className="label-text text-gray-300 font-medium">Photo URL</span>
              </label>
              <input
                {...register("photoURL", { required: true })}
                placeholder="https://imgur.com/..."
                className="input input-bordered bg-[#15191e] text-white border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 h-12 text-base transition-all"
              />
              {errors.photoURL && <span className="text-red-500 text-sm mt-1">URL is required</span>}
            </div>

            {/* Password Input */}
            <div className="form-control relative mb-4">
              <label className="label py-1">
                <span className="label-text text-gray-300 font-medium">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                placeholder="••••••••"
                className="input input-bordered bg-[#15191e] text-white border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 w-full pr-12 h-12 text-base transition-all"
              />
              <span
                className="absolute right-4 top-[42px] cursor-pointer text-cyan-500 hover:text-cyan-400 transition-colors text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <span className="text-red-500 text-sm mt-1">Min 6 charcters required</span>}
            </div>

            {/* Role Select */}
            <div className="form-control mb-6">
              <label className="label py-1">
                <span className="label-text text-gray-300 font-medium">Account Type</span>
              </label>
              <select
                defaultValue="default"
                {...register("role", { required: true })}
                className="select select-bordered bg-[#15191e] text-white border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 h-12 min-h-0 text-base transition-all"
              >
                <option disabled value="default">Select Role</option>
                <option value="worker">Worker (Start Earning)</option>
                <option value="buyer">Buyer (Start Hiring)</option>
              </select>
              {errors.role && <span className="text-red-500 text-sm mt-1">Role is required</span>}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-2">
              <button className="btn bg-gradient-to-r from-[#3b82f6] to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-none text-lg font-bold h-12 shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] transition-all duration-200">
                Create Account
              </button>
            </div>

            <div className="divider text-gray-600 my-4 text-xs tracking-widest uppercase">Or Continue With</div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center gap-3 text-white hover:bg-white hover:text-black border-gray-600 h-12 text-base font-semibold hover:border-white transition-all"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                width="22"
                alt="Google"
              />
              Google
            </button>

            {/* Login Link */}
            <label className="label justify-center mt-4 py-0">
              <span className="label-text-alt text-sm text-gray-400">
                Already a member?{" "}
                <Link to="/login" className="link no-underline text-cyan-400 hover:text-cyan-300 font-bold ml-1 transition-colors">
                  Log In
                </Link>
              </span>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;