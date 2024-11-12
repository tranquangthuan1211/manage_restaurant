import { use, useEffect } from "react";
import { useContext, createContext, Children } from "react";
import useFunction,{UseFunctionReturnType, DEFAULT_FUNCTION_RETURN} from "src/hooks/use-function";
import MenuApi from "src/api/menu";
import { Food } from "src/types/food";
interface ContextValue {
    getMenu: UseFunctionReturnType<FormData,{data:Food[]}>;
    createFood?: (request:Partial<Food>) => Promise<void>;
}

const MenuContext = createContext<ContextValue>({
    getMenu: DEFAULT_FUNCTION_RETURN,
    createFood: async () => {},
});
const MenuProvider = ({children}:{children:React.ReactNode}) => {
    const getMenu = useFunction(MenuApi.getMenu);

    useEffect(() => {
        getMenu.call(new FormData());
    },[]);
    return (
        <MenuContext.Provider value={{getMenu}}>
            {children}
        </MenuContext.Provider>
    );
}
export const useMenu = () => useContext(MenuContext);
export default MenuProvider;