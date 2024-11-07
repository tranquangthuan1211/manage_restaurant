import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
    DISPATCH_ACTION
} from "@paypal/react-paypal-js";
import { FC, useEffect } from "react";

const style = { layout: "vertical" };

interface ButtonWrapperProps {
    currency: string;
    showSpinner: boolean;
    amount: number;
    recipientEmail: string;  // Thêm email của người nhận
}

export const ButtonWrapper: FC<ButtonWrapperProps> = ({ currency, showSpinner, amount, recipientEmail }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: DISPATCH_ACTION.RESET_OPTIONS,
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency]);

    const handlePaymentSuccess = async (orderID: string) => {
        // Sau khi thanh toán thành công, gửi yêu cầu đến server để chuyển tiền cho người nhận
        const response = await fetch("/api/paypal/transfer-money", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                payer_id:"KEFENF4LKCPX8",
                recipientEmail,
                amount,
            }),
        });

        const result = await response.json();
        if (result.success) {
            console.log("Payment and transfer completed successfully");
        } else {
            console.error("Error transferring money", result.error);
        }
    };

    return (
        <>
            {showSpinner && isPending && (
                <div className="spinner" />
            )}
            <PayPalButtons
                style={{ layout: "vertical" }}
                disabled={false}
                forceReRender={[currency, amount]}
                createOrder={(data, actions) =>
                    actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount.toFixed(2),
                                },
                            },
                        ],
                    }).then((orderId: string) => orderId)
                }
                onApprove={(data, actions) => {
                    if (!actions?.order) {
                        console.error("Order capture actions are not available");
                        return Promise.reject(new Error("Order capture actions are not available"));
                    }
                    return actions.order.capture().then((response) => {
                        console.log(response);
                        handlePaymentSuccess("KEFENF4LKCPX8"); 
                    });
                }}
            />
        </>
    );
};

const Paypal = ({ amount, recipientEmail }: { amount: number; recipientEmail: string }) => {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
                options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                    components: "buttons",
                    currency: "USD",
                }}
            >
                <ButtonWrapper amount={amount} currency="USD" showSpinner={false} recipientEmail={recipientEmail} />
            </PayPalScriptProvider>
        </div>
    );
};

export default Paypal;
