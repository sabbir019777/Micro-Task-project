import { useContext, useState, useEffect } from "react"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const fillDemoCredentials = (demoEmail, demoPassword) => {
    setEmail("");
    setPassword("");
    
    setTimeout(() => {
        setEmail(demoEmail);
        setPassword(demoPassword);
    }, 50); 
  };

  const getAccessToken = async (email) => {
    try {

      const response = await axios.post("http://localhost:5000/jwt", { email });
      if (response.data.token) {
        localStorage.setItem("access-token", response.data.token);
      }
    } catch (err) {
      console.error("JWT Error:", err);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    signIn(email, password)
      .then(async (result) => {
        await getAccessToken(result.user.email);
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
          console.log(err);
          setError("Invalid email or password.");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      const userInfo = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        role: "worker",
        image: loggedInUser.photoURL,
      };

     
      axios.post("http://localhost:5000/users", userInfo).then(async () => {
        await getAccessToken(loggedInUser.email);
        Swal.fire({
          title: "Google Login Successful",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/dashboard", { replace: true });
      });
    });
  };

  return (
    <div className="hero min-h-screen bg-[#1d232a]">
      <div className="hero-content flex-col lg:flex-row justify-between w-full max-w-6xl px-4">
        
        <div className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#3b82f6]">
            MicroTasker
          </h1>
          <p className="py-6 text-gray-300 text-lg">
            MicroTasker help you connect and earn money by completing simple
            tasks daily. Join our community today!
          </p>
        </div>

        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-gray-700">
          
          <form onSubmit={handleLogin} className="card-body">
            
            {/* --- Demo Buttons --- */}
            <div className="mb-4">
              <p className="text-center text-gray-400 text-xs mb-2">Click to Fill Credentials</p>
              <div className="flex gap-2 justify-between">
                <button 
                  type="button"
                  onClick={() => fillDemoCredentials('sa20@gmail.com', 'sabbir@123')}
                  className="btn btn-xs bg-purple-600 hover:bg-purple-700 text-white border-none flex-1"
                >
                  Admin
                </button>
                <button 
                  type="button"
                  onClick={() => fillDemoCredentials('tamim@123gmail.com', 'Tamim@123')}
                  className="btn btn-xs bg-orange-600 hover:bg-orange-700 text-white border-none flex-1"
                >
                  Buyer
                </button>
                <button 
                  type="button"
                  onClick={() => fillDemoCredentials('somrat@gmail.com', 'somrat@123')}
                  className="btn btn-xs bg-green-600 hover:bg-green-700 text-white border-none flex-1"
                >
                  Worker
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered focus:border-[#3b82f6] bg-[#1d232a] text-white" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-gray-300">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered focus:border-[#3b82f6] bg-[#1d232a] text-white w-full pr-10"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-[52px] cursor-pointer text-lg transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                    color: password ? '#3b82f6' : '#6b7280'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            <div className="form-control mt-6">
              <button type="submit" className="btn bg-[#3b82f6] hover:bg-[#2563eb] text-white border-none text-lg">
                Log In
              </button>
            </div>

            <div className="divider text-gray-500">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center gap-2 text-white hover:bg-white hover:text-black border-gray-500"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                width="20"
                alt="Google"
              />
              Continue with Google
            </button>

            <label className="label justify-center mt-4">
              <span className="label-text-alt text-base text-gray-400">
                New here?{" "}
                <Link
                  to="/signup"
                  className="link link-hover text-[#3b82f6] font-bold"
                >
                  Create an account
                </Link>
              </span>
            </label>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;