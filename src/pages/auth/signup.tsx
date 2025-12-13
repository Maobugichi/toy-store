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
import { handleLoginSuccess } from "@/services/mergecartService";
import api from "@/config/axios-config"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading , setLoading ] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  

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

  const url = import.meta.env.VITE_API_URL 

  return (
    <div className="md:h-[140vh] font-family-sans h-screen grid place-items-center font-inter">
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
                <FormLabel className="font-family-heading text-2xl">Username</FormLabel>
                <FormControl>
                  <Input className="py-6 rounded-3xl text-lg placeholder:text-lg tracking-widest" placeholder="Champagne" {...field} />
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
                <FormLabel className="font-family-heading text-2xl">Email</FormLabel>
                <FormControl>
                  <Input className="py-6 rounded-3xl text-lg placeholder:text-lg tracking-widest" placeholder="johndoe@gmail.com" type="email" {...field} />
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
                <FormLabel className="text-2xl font-family-heading">Password</FormLabel>
                <div className="relative"> 
                  <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                   </button>
                   <FormControl>
                    <Input className="py-6  rounded-3xl text-lg placeholder:text-lg tracking-widest" placeholder="************"  type={showPassword ? "text" : "password"} {...field} />
                   </FormControl>
                </div>
               
                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit" className={`${loading ? "bg-black/20" : "bg-black" } relative overflow-hidden  text-white text-sm md:text-lg py-6 rounded-3xl w-full`}>
             <>
                <span className="absolute inset-0 bg-black rounded-xl" />
                <span className="absolute inset-0 bg-gradient-to-r from-black/0 via-white/20 to-black/0 animate-shimmer" />
              </>
            {loading ? <ClipLoader size={10} color="black" className="relative z-10"/> : <span className="relative z-10 text-lg tracking-wider">Submit</span> }
          </Button>

          <div className="bg-white shadow w-full tracking-wider  border flex items-center justify-center gap-2  text-lg h-8 md:h-12 py-6 rounded-3xl ">
            <FcGoogle />
            <Button
              type="button"
              variant="ghost"
              onClick={() => (window.location.href = `${url}/auth/google`)}
            >
              Continue with Google
            </Button>
          </div>

          <span className="tracking-wide text-black/70 ">
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
