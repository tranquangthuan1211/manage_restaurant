import { createContext, useEffect, useContext, useCallback } from "react";
import useFunction,{UseFunctionReturnType, DEFAULT_FUNCTION_RETURN} from "src/hooks/use-function";
import useAppSnackbar from "src/hooks/use-app-snackbar";
import LeaveApi from "src/api/leave";
import {Leave,initialLeave} from "src/types/leave";
import { get } from "lodash";

interface ContextValue {
    getLeave: UseFunctionReturnType<FormData,{data:Leave[]}>
    createLeave: (request:Partial<Leave>) => Promise<void>;
    updateLeave:(request:Partial<Leave>) => Promise<void>;
    deleteLeave: (id:string) => Promise<void>;
}

const LeaveContext = createContext<ContextValue>({
    getLeave: DEFAULT_FUNCTION_RETURN,
    createLeave: async () => {},
    updateLeave: async () => {},
    deleteLeave: async () => {},
});

const LeaveProvider = ({children}:{children:React.ReactNode}) => {
    const getLeave = useFunction(LeaveApi.getLeave);
    const {showSnackbarError, showSnackbarSuccess} = useAppSnackbar();
    const createLeave = useCallback(async (request:Partial<Leave>) => {
        try {
    
            const response = await LeaveApi.createEmployee(request); 
            if (response) {
                const newEmployee = [
                    {
                        ...initialLeave,
                        ...request,
                        ...response,
                    },
                    ...(getLeave.data?.data || []),
                ];
                getLeave.setData({
                    data: newEmployee,
                });
            }
        } catch (error: any) {
            console.error(error);
            showSnackbarError(error.message);
        }
        
    },[getLeave]);
    const updateLeave = useCallback(async (request:Partial<Leave>) => {
        try {
            const response = await LeaveApi.updateEmployee(request);
            if (response) {
               
                getLeave.setData({
                        data: (getLeave.data?.data || []).map((employee: Leave) => {
                            if(employee._id === request._id) {
                                return {...employee, ...request};
                            }
                            return employee;
                        })                 
                           
                });
                showSnackbarSuccess("Update employee success");
            }
        } catch (error: any) {
            console.error(error);
            showSnackbarError(error.message);
        }
    },[getLeave]);
    const deleteLeave = useCallback(async (id:string) => {
        try {
            const response = await LeaveApi.deleteEmployee(id);
            if (response) {
                getLeave.setData({
                    data: (getLeave.data?.data || []).filter((employee: Leave) => employee._id !== id),
                });
                showSnackbarSuccess("Delete employee success");
            }
        } catch (error: any) {
            console.error(error);
            showSnackbarError(error.message);
        }
    },[getLeave]);
    useEffect(() => {
        getLeave.call(new FormData());
    },[]);
    return (
        <LeaveContext.Provider 
            value={
                {
                    getLeave,
                    createLeave,
                    updateLeave,
                    deleteLeave,
                }
            }
        >
            {children}
        </LeaveContext.Provider>
    );
};
export const useLeave = () => useContext(LeaveContext);
export default LeaveProvider;