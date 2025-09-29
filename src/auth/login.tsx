import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { useNavigate ,Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { handleLoginSuccess } from "./hook";



const formSchema = z.object({
   email:z.email({ message: "Invalid Email address" }),
   password:z.string().min(6,{message: 'password must be at least 6 characters'})
});


const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading , setLoading ] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })
    const url = import.meta.env.VITE_API_URL

    async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true)
     try {
        const response = await axios.post(`${url}/auth/login`,values,{withCredentials:true});
        
        setLoading(false)
        login(response.data);
        handleLoginSuccess();
        navigate('/')   
     } catch(err) {
        console.log(err)
     }
    
  }

  return(
     <div className="h-screen grid place-items-center font-inter">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit p-6  rounded-2xl border-2 md:h-fit md:py-6 gap-3 flex flex-col w-[90%] items-center justify-center md:w-1/2 space-y-2 mx-auto"
        >
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className={`${loading ? "bg-black/80" : "bg-black"}  text-white text-sm md:text-lg h-8 md:h-12 md:w-[90%] w-full`}>
            {loading ? <ClipLoader size={20} color="white"/> : 'Submit' }
          </Button>

          <div className="bg-white shadow md:w-[90%] w-full border flex h-7 md:h-8 items-center justify-center gap-2 rounded-sm">
            <FcGoogle />
            <Button
              type="button"
              variant="ghost"
              onClick={() => (window.location.href = "http://localhost:3000/auth/google")}
            >
              Continue with Google
            </Button>
          </div>

          <span>
            Already have an account?{" "}
            <Link className="text-blue-700 underline" to="/login/">
              Login
            </Link>
          </span>
        </form>
      </Form>
    </div>
  )
}

export default Login