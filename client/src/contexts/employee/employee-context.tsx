import { createContext, useEffect, useContext, useCallback } from "react";
import useFunction,{UseFunctionReturnType, DEFAULT_FUNCTION_RETURN} from "src/hooks/use-function";
import { Employee,initialEmployee } from "src/types/employee";
import EmployeeApi from "src/api/employee";
import useAppSnackbar from "src/hooks/use-app-snackbar";
import employee from "src/api/employee";

interface ContextValue {
    getEmployee: UseFunctionReturnType<FormData,{data:Employee[]}>
    createEmployee: (request:Partial<Employee>) => Promise<void>;
    updateEmployee:(request:Partial<Employee>) => Promise<void>;
    deleteEmployee?: (id:string) => Promise<void>;
}

const EmployeeContext = createContext<ContextValue>({
    getEmployee: DEFAULT_FUNCTION_RETURN,
    createEmployee: async () => {},
    updateEmployee: async () => {},
    deleteEmployee: async () => {},
});

const EmployeeProvider = ({children}:{children:React.ReactNode}) => {
    const getEmployee = useFunction(EmployeeApi.getEmployee);
    const {showSnackbarError, showSnackbarSuccess} = useAppSnackbar();
    const createEmployee = useCallback(async (request:Partial<Employee>) => {
        try {
    
            const response = await EmployeeApi.createEmployee(request); 
            if (response) {
                const newEmployee = [
                    {
                        ...initialEmployee,
                        ...request,
                        ...response,
                    },
                    ...(getEmployee.data?.data || []),
                ];
                getEmployee.setData({
                    data: newEmployee,
                });
            }
        } catch (error: any) {
            console.error(error);
            showSnackbarError(error.message);
        }
        
    },[getEmployee]);
    const updateEmployee = useCallback(async (request:Partial<Employee>) => {
        try {
            const response = await EmployeeApi.updateEmployee(request);
            if (response) {
               
                getEmployee.setData({
                        data: (getEmployee.data?.data || []).map((employee: Employee) => {
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
    },[getEmployee]);
    useEffect(() => {
        getEmployee.call(new FormData());
    },[]);
    return (
        <EmployeeContext.Provider 
            value={
                {
                    getEmployee,
                    createEmployee,
                    updateEmployee
                }
            }
        >
            {children}
        </EmployeeContext.Provider>
    );
};
export const useEmployee = () => useContext(EmployeeContext);
export default EmployeeProvider;