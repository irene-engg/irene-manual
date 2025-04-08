/*import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.mode === "development" ? "http://localhost:5004/api" : "/api",
	withCredentials: true, 
});

export default axiosInstance;*/

import axios from "axios";

// Set up axios with backend ALB DNS for production and localhost for development
const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" 
		? "http://localhost:5004/api" 
		: "http://backend-alb-657621.ca-central-1.elb.amazonaws.com:5000/api", // ALB DNS with port for production
	withCredentials: true, 
});

// Add a request interceptor to attach the auth token to all requests
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;

