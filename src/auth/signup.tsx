import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useAuth } from "@/context/authContext"
import { useState } from "react"
import { ClipLoader } from "react-spinners"
import { handleLoginSuccess } from "./hook"

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL
  const [loading , setLoading ] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
     try {
        const response = await axios.post(`${url}/auth/signup`,values,{withCredentials:true});
        setLoading(false)
        login(response.data);
        handleLoginSuccess();
        navigate('/')   
     } catch(err) {
        console.log(err)
        setLoading(false)
     }
    
  }

  return (
    <div className="h-screen grid place-items-center font-inter">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit p-6  rounded-2xl border-2 md:h-fit md:py-6 gap-3 flex flex-col w-[90%] items-center justify-center md:w-1/2 space-y-2 mx-auto"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button type="submit" className={`${loading ? "bg-black/20" : "bg-black" }  text-white text-sm md:text-lg h-8 md:h-12 md:w-[90%] w-full`}>
            {loading ? <ClipLoader size={10} color="black"/> : 'Submit' }
          </Button>

          <div className="bg-white shadow w-full md:w-[90%] border flex h-7 md:h-8 items-center justify-center gap-2 rounded-sm">
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

export default SignUp
