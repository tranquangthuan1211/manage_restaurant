import "dotenv/config";
import express, { Request, Response } from "express";
const fetch = require('node-fetch');;

const router = express.Router();

const PAYPAL_API_URL = 'https://api.paypal.com/v1/payments/payouts';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET!;

// Tạo kiểu cho response từ API
interface PayoutResponse {
  batch_header: {
    batch_status: string;
  };
  [key: string]: any;
}

// Lấy access token từ PayPal
const getAccessToken = async (): Promise<string> => {
    const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Đảm bảo rằng bạn đã chuyển đổi client_id và secret sang base64 đúng cách
            'Authorization': `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')}`,
        },
        body: 'grant_type=client_credentials',
    });

    // Kiểm tra nếu có lỗi trong phản hồi
    // if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error('Error getting access token:', errorData);
    //     throw new Error(`Error getting access token: ${errorData.error_description}`);
    // }

    const data = await response.json();
    // console.log('Access token:', data);  // Ghi lại access token để kiểm tra

    return data.access_token;
};


const transferMoney = async (payerId: string, recipientEmail: string, amount: number) => {
    const accessToken = await getAccessToken();
    console.log(accessToken)
    const payoutData = {
        sender_batch_header: {
            sender_batch_id: "1311ddđdd1",
            email_subject: "You have a payout!",
            email_message: "You have received a payout! Thanks for using our service!"
          },
          items: [
            {
              recipient_type: "EMAIL",
              amount: { value: "9.87", currency: "USD" },
              note: "Thanks for your patronage!",
              sender_item_id: "KEFENF4LKCPX98",
              receiver: "sb-64jjv33846136@personal.example.com", // Replace with actual email
            //   alternate_notification_method: { phone: { country_code: "91", national_number: "9999988888" } },
              notification_language: "fr-FR"
            },
          ]
    };
    const response = await fetch("https://api-m.sandbox.paypal.com/v1/payments/payouts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payoutData),
    });

    const result = await response.json();
    // console.log("result: ", result)
    return result;
};
const checkBatchStatus = async (batchId: string) => {
    const accessToken = await getAccessToken();
  
    const response = await fetch(`https://api-m.sandbox.paypal.com/v1/payments/payouts/${batchId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  
    const result = await response.json();
    return result;
  };

const usePaymentRoute = () => {
    router.post('/transfer-money', async (req: Request, res: Response) => {
        const { payer_id, recipient_email, amount }: { payer_id: string; recipient_email: string; amount: number } = req.body;
      
        try {
            const result = await transferMoney("SJ9GALVEZ98FY", "sb-oqeaw33175906@business.example.com", amount);
            console.log(result);
            
            if (result.batch_header.batch_status === 'PENDING') {
                // Đợi 1 phút trước khi kiểm tra lại trạng thái
                await new Promise(resolve => setTimeout(resolve, 10000));
                
                const batchStatus = await checkBatchStatus(result.batch_header.payout_batch_id);
        
                if (batchStatus.batch_header.batch_status === "SUCCESS") {
                    return res.status(200).json({
                        message: "Payment is successful"
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Payout is still pending or failed"
                    });
                }
            } else if (result.batch_header.batch_status === 'SUCCESS') {
                // Trạng thái ban đầu đã là thành công
                return res.status(200).json({
                    message: "Payment is successful"
                });
            }  else {
              res.status(200).json({ success: false });
            }
        } catch (error) {
          console.error('Error transferring money', error);
          res.status(500).json({ error: 'Transfer failed' });
        }
      });

    return router;
}

export default usePaymentRoute;
