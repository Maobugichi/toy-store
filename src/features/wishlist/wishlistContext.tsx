import { createContext, useContext, useState, type SetStateAction } from "react";

interface WishContextProps {
    isCreateDialogOpen:boolean 
    setIsCreateDialogOpen:React.Dispatch<SetStateAction<boolean>>
}

const WishContext  = createContext<WishContextProps | null>(null);

export const WishContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
     return(
         <WishContext.Provider value={{
            isCreateDialogOpen,
            setIsCreateDialogOpen
          }}
         >
            {children}
         </WishContext.Provider>
     )
   
}


export function useWishlistDialog() {
   const context = useContext(WishContext)
    if (!context) {
      throw new Error("useWishlistDialog must be used inside FilterContextProvider");
    }
  return context
}
