import React, { useState } from "react";
import { connectWallet, getContract } from "../services/blockchain";
import { ethers } from "ethers";

const PaymentComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handlePayment = async () => {
    try {
      // Подключаем кошелек и получаем подписчика
      const signer = await connectWallet();

      // Если пользователь не подключил кошелек, выходим из функции
      if (!signer) {
        console.error("Wallet not connected");
        return;
      }

      const address = await signer.getAddress();

      // Получаем экземпляр контракта
      const contract = getContract(
        "0xCa9aF5903c1A30a92f226D426C331feC3cee9Ffe",
        [
          {
            inputs: [
              {
                internalType: "address",
                name: "buyer",
                type: "address",
              },
            ],
            name: "pay",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
        ]
      );

      // Отправляем транзакцию на контракт с использованием подписчика
      const transaction = await contract.pay(address, {
        value: ethers.utils.parseEther("0.1"),
      });

      setMessage("Payment successful!");
    } catch (error) {
      console.error("Error sending payment:", error);
      setMessage("Error sending payment");
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Send Payment</button>
      <p>{message}</p>
    </div>
  );
};

export default PaymentComponent;
