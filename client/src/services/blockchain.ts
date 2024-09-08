import { BrowserProvider } from "ethers";

const ethereum = (window as any).ethereum;

const provider = new BrowserProvider(window.ethereum);

export const connectWallet = async () => {
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  // Получаем адрес из подписчика
  const address = await signer.getAddress();
  console.log("Address:", address); // Добавляем логгирование адреса

  return signer;
};

export const getContract = (address: string, abi: any) => {
  return new ethers.Contract(address, abi, provider);
};

// Функция для отправки платежа на блокчейн
export const sendPayment = async (price: string) => {
  try {
    // Подключение кошелька
    const signer = await connectWallet();
    // Получение экземпляра контракта (замените address и abi на соответствующие значения)
    const contract = getContract("0xCa9aF5903c1A30a92f226D426C331feC3cee9Ffe", [
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
    ]);
    // Вызов метода контракта для проведения платежа с указанием цены товара
    const address = await signer.getAddress();

    const transaction = await contract.pay(address, {
      value: "0.1",
    });
    // Возвращаем результат выполнения транзакции
    return transaction.wait();
  } catch (error) {
    // Вывод сообщения об ошибке в случае неудачной покупки
    console.error("Error purchasing product:", error);
    throw new Error("Error purchasing product");
  }
};
