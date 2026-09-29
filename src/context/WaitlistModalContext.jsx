import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const WaitlistModalContext = createContext(null);

export const WaitlistModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferralCode(ref.toUpperCase());
      setIsOpen(true);
    }
  }, [searchParams]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <WaitlistModalContext.Provider
      value={{ isOpen, openModal, closeModal, referralCode, setReferralCode }}
    >
      {children}
    </WaitlistModalContext.Provider>
  );
};

export const useWaitlistModal = () => useContext(WaitlistModalContext);
