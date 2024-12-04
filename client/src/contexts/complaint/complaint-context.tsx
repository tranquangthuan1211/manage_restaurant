import {createContext,useCallback,useContext, useEffect} from 'react';
import {Complaint,initialComplaint} from 'src/types/complaint';
import useFunction,{UseFunctionReturnType, DEFAULT_FUNCTION_RETURN} from "src/hooks/use-function";
import ComplaintApi from "src/api/complaint";
import useAppSnackbar from 'src/hooks/use-app-snackbar';

interface ContextValue {
    getComplaints: UseFunctionReturnType<FormData,{data:Complaint[]}>;
    createComplaint: (request:Partial<Complaint>) => Promise<void>;
    updateComplaint:(request:Partial<Complaint>) => Promise<void>;
    deleteComplaint: (id:string) => Promise<void>;
}

const ComplaintContext = createContext<ContextValue>({
    getComplaints: DEFAULT_FUNCTION_RETURN,
    createComplaint: async () => {},
    updateComplaint: async () => {},
    deleteComplaint: async () => {},
});

const ComplaintProvider = ({children}:{children:React.ReactNode}) => {
    const getComplaints = useFunction(ComplaintApi.getComplaints);
    const {showSnackbarError, showSnackbarSuccess} = useAppSnackbar();
    const createComplaint = useCallback(async (request:Partial<Complaint>) => {
        try {
    
            const response = await ComplaintApi.createComplaint(request); 
            if (response) {
                const newEmployee = [
                    {
                        ...initialComplaint,
                        ...request,
                        ...response,
                    },
                    ...(getComplaints.data?.data || []),
                ];
                getComplaints.setData({
                    data: newEmployee,
                });
            }
        } catch (error: any) {
            console.error(error);
            showSnackbarError(error.message);
        }
        
    },[getComplaints]);
    const updateComplaint = useCallback(async (request:Partial<Complaint>) => {
        try {
            const response = await ComplaintApi.updateComplaint(request);
            if (response) {
               
                getComplaints.setData({
                        data: (getComplaints.data?.data || []).map((complaint: Complaint) => {
                            if(complaint._id === request._id) {
                                return {...complaint, ...request};
                            }
                            return complaint;
                        }) 
                });                
                           
            }
        } catch (error: any) {
            console.error(error);
            showSnackbarError(error.message);
        }   
    },[getComplaints]);
    const deleteComplaint = useCallback(async (id:string) => {
        try {
            await ComplaintApi.deleteComplaint(id);
            getComplaints.setData({
                data: (getComplaints.data?.data || []).filter((complaint: Complaint) => complaint._id !== id)
            });
            showSnackbarSuccess("Delete complaint success");
        } catch (error: any) {
            console.error(error);
            showSnackbarError(error.message);
        }
    },[getComplaints]);
    useEffect(() => {
        getComplaints.call({});
    },[]);
    return (
        <ComplaintContext.Provider value={{
            getComplaints,
            createComplaint,
            updateComplaint,
            deleteComplaint,
        }}>
            {children}
        </ComplaintContext.Provider>
    )
}

export const useComplaint = () => useContext(ComplaintContext);
export default ComplaintProvider;
