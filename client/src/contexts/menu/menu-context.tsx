import { use, useCallback, useEffect } from "react";
import { useContext, createContext, Children } from "react";
import useFunction,{UseFunctionReturnType, DEFAULT_FUNCTION_RETURN} from "src/hooks/use-function";
import MenuApi from "src/api/menu";
import { Food, initialFood } from "src/types/food";
import useAppSnackbar from "src/hooks/use-app-snackbar";
interface ContextValue {
    getMenu: UseFunctionReturnType<FormData,{data:Food[]}>;
    createFood: (request:Partial<Food>) => Promise<void>;
    updateFood:(request:Partial<Food>) => Promise<void>;
    deleteFood: (id:string) => Promise<void>;
}

const MenuContext = createContext<ContextValue>({
    getMenu: DEFAULT_FUNCTION_RETURN,
    createFood: async () => {},
    updateFood: async () => {},
    deleteFood: async () => {},
});
const MenuProvider = ({children}:{children:React.ReactNode}) => {
    const { showSnackbarError, showSnackbarSuccess } = useAppSnackbar();
    const getMenu = useFunction(MenuApi.getMenu);
    const createFood = useCallback(async (request: Partial<Food>) => {
        try {
            const formData = new FormData();
            Object.entries(request).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value as Blob);
                }
            });
    
            const response = await MenuApi.createFood(formData); 
            request.image = (request.image ? URL.createObjectURL(request.image as unknown as File) : null)  
            if (response) {
                const newFood = [
                    {
                        ...initialFood,
                        ...request,
                        ...response,
                    },
                    ...(getMenu.data?.data || []),
                ];
                getMenu.setData({
                    data: newFood,
                });
            }
        } catch (error: any) {
            console.error(error);
            showSnackbarError(error.message);
        }
    }, [getMenu]);
    
    const updateFood = useCallback(async (request:Partial<Food>) => {
        try {
            const response = await MenuApi.updateFood(request);

            if(response) {
                
                getMenu.setData({
                    data: (getMenu.data?.data || []).map((food: Food) => {
                        if(food._id === request._id) {
                            return {...food, ...request};
                        }
                        return food;
                    })                 
                                    
                });
            }
        }catch(error){
            console.log(error)
            showSnackbarError(error.message)
        }
    },[getMenu])
    const deleteFood = useCallback(async (id:string) => {
        try {
            await MenuApi.deleteFood(id);
            getMenu.setData({
                data: (getMenu.data?.data || []).filter((food: Food) => food._id !== id)
            });
            showSnackbarSuccess("Xóa thành công!");
        } catch (error) {
            console.log(error);
            showSnackbarError(error.message);
        }
    },[]);
    useEffect(() => {
        getMenu.call(new FormData());
    },[]);
    return (
        <MenuContext.Provider value={{
            getMenu,
            createFood,
            updateFood,
            deleteFood,
        }}>
            {children}
        </MenuContext.Provider>
    );
}
export const useMenu = () => useContext(MenuContext);
export default MenuProvider;