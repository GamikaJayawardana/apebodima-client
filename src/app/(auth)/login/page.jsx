"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../../../services/authService";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (error) {
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            icon={Mail}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          No account?{" "}
          <Link href="/register" className="font-bold text-black">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
