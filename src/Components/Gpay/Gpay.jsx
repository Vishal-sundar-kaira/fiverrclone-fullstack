import React from 'react'
import GooglePayButton from '@google-pay/button-react'
const Gpay = () => {
    return (
        <div>
          <h1>My React Website</h1>
          <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: 'CARD',
                  parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                  },
                  tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                      gateway: 'example',
                      gatewayMerchantId: 'exampleGatewayMerchantId',
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: '12345678901234567890',
                merchantName: 'Example Merchant',
              },
              transactionInfo: {
                totalPriceStatus: 'FINAL',
                totalPriceLabel: 'Total',
                totalPrice: '100.00',
                currencyCode: 'INR',
                countryCode: 'IN',
              },
            }}
            onLoadPaymentData={paymentRequest => {
              console.log('load payment data', paymentRequest);
            }}
            onPaymentAuthorized={paymentData => {
              console.log('payment authorized', paymentData);
              return { transactionState: 'SUCCESS' };
            }}
            existingPaymentMethodRequired={false}
            buttonColor="default"
            buttonType="buy"
          />
        </div>
      );
}

export default Gpay
