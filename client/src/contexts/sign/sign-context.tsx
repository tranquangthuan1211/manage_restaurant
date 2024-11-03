import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
} from "react";

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";

import { Sign } from "src/types/sign";

import { SignsApi } from "src/api/signs";

interface ContextValue {
  getSignsApi: UseFunctionReturnType<FormData, Sign[]>;
  createSign: (requests: Sign) => Promise<void>;
  updateSign: (sign: Sign) => Promise<void>;
  deleteSign: (id: string) => Promise<void>;
}

export const SignsContext = createContext<ContextValue>({
  getSignsApi: DEFAULT_FUNCTION_RETURN,

  createSign: async () => {},
  updateSign: async () => {},
  deleteSign: async () => {},
});

const SignsProvider = ({ children }: { children: ReactNode }) => {
  const getSignsApi = useFunction(SignsApi.getSigns);

  const createSign = useCallback(
    async (request: Sign) => {
      try {
        const response = await SignsApi.postSign(request);
        if (response) {
          const newSign = [
            {
              ...request,
              id: response,
            },
            ...(getSignsApi.data || []),
          ];
          getSignsApi.setData(newSign);
        }
      } catch (error) {
        throw error;
      }
    },
    [getSignsApi]
  );

  const updateSign = useCallback(
    async (sign: Sign) => {
      try {
        const response = await SignsApi.putSign(sign);
        if (response) {
          getSignsApi.setData(
            (getSignsApi.data || []).map((item) => {
              return item.id == sign.id
                ? Object.assign(item, { ...sign })
                : item;
            })
          );
        }
      } catch (error) {
        throw error;
      }
    },
    [getSignsApi]
  );

  const deleteSign = useCallback(
    async (id: string) => {
      try {
        const response = await SignsApi.deleteSign(id);
        if (response) {
          getSignsApi.setData([
            ...(getSignsApi.data || []).filter((sign) => {
              return sign.id != id;
            }),
          ]);
        }
      } catch (error) {
        throw error;
      }
    },
    [getSignsApi]
  );

  useEffect(() => {
    getSignsApi.call(new FormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SignsContext.Provider
      value={{
        getSignsApi,

        createSign,
        updateSign,
        deleteSign,
      }}
    >
      {children}
    </SignsContext.Provider>
  );
};

export const useSignsContext = () => useContext(SignsContext);

export default SignsProvider;
