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
import { useAuth } from "@/context/authContext"
import { useState } from "react"
import { ClipLoader } from "react-spinners"
import { handleLoginSuccess } from "./hook"
import api from "@/lib/axios-config"
import { toast } from "sonner"

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
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
        const response = await api.post(`/auth/signup`,values);
        setLoading(false)
        login(response.data);
        await handleLoginSuccess();
         toast.success("Signup Successful! 🎉", {
          description: "Welcome onboard theTOYshop!",
        });
        navigate('/')   
     } catch(err) {
        console.log(err)
        setLoading(false)
     }
    
  }

  return (
    <div className="md:h-[140vh] h-screen grid place-items-center font-inter">
      <Form {...form}>
        
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" h-fit p-6  rounded-4xl border-2  gap-3 flex flex-col w-[90%] items-center justify-center md:w-[40%] space-y-2 mx-auto"
        >
          <div>
            <img src='https://res.cloudinary.com/dao2a3ib4/image/upload/v1759248907/toy-logoo_qt8unk.png' alt='toyshop logo' className='object-cover h-28 w-32'/>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-2xl">Username</FormLabel>
                <FormControl>
                  <Input className="py-6 rounded-3xl placeholder:text-lg tracking-wider" placeholder="Champagne" {...field} />
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
                <FormLabel className="text-2xl">Email</FormLabel>
                <FormControl>
                  <Input className="py-6 rounded-3xl placeholder:text-lg tracking-wider" placeholder="johndoe@gmail.com" type="email" {...field} />
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
                <FormLabel className="text-2xl">Password</FormLabel>
                <FormControl>
                  <Input className="py-6  rounded-3xl placeholder:text-lg tracking-wider" placeholder="************" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit" className={`${loading ? "bg-black/20" : "bg-black" } relative overflow-hidden  text-white text-sm md:text-lg h-8 md:h-12 py-5 rounded-3xl w-full`}>
             <>
                        <span className="absolute inset-0 bg-black rounded-xl" />
                        <span className="absolute inset-0 bg-gradient-to-r from-black/0 via-white/20 to-black/0 animate-shimmer" />
              </>
            {loading ? <ClipLoader size={10} color="black" className="relative z-10"/> : <span className="relative z-10">Submit</span> }
          </Button>

          <div className="bg-white shadow w-full  border flex items-center justify-center gap-2 text-sm md:text-lg h-8 md:h-12 py-5 rounded-3xl ">
            <FcGoogle />
            <Button
              type="button"
              variant="ghost"
              onClick={() => (window.location.href = "http://localhost:3000/auth/google")}
            >
              Continue with Google
            </Button>
          </div>

          <span className="tracking-wide text-black/70">
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
