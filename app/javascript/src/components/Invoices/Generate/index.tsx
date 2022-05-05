import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import generateInvoice from "apis/generateInvoice";

import Container from "./Container";
import Header from "./Header";
import { unmapGenerateInvoice } from "../../../mapper/generateInvoice.mapper";

const fetchGenerateInvoice = async (navigate, getInvoiceDetails) => {
  try {
    const res = await generateInvoice.get();
    const sanitzed = await unmapGenerateInvoice(res.data);
    getInvoiceDetails(sanitzed);

  } catch (e) {
    navigate("invoices/error");
    return {};
  }
};

const GenerateInvoices = () => {
  const navigate = useNavigate();
  const [invoiceDetails, getInvoiceDetails] = useState<any>();
  const [lineItems, setLineItems] = useState<any>([]);
  const [selectedClient, setSelectedClient] = useState<any>();
  const [invoiceNumber, setInvoiceNumber] = useState<any>("");
  const [reference] = useState<any>("");
  const [amount, setAmount] = useState<any>(0);
  const [amountDue, setAmountDue] = useState<any>(0);
  const [amountPaid] = useState<any>(0);
  const [discount, setDiscount] = useState<any>(0);
  const [tax, setTax] = useState<any>(0);
  const [issueDate, setIssueDate] = useState(new Date());
  const today = new Date();
  const [dueDate, setDueDate] = useState(today.setMonth(issueDate.getMonth() + 1));
  const [selectedOption, setSelectedOption] = useState<any>([]);

  useEffect(() => {
    setAuthHeaders();
    registerIntercepts();
    fetchGenerateInvoice(navigate, getInvoiceDetails);
  }, []);

  if (invoiceDetails) {
    return (
      <React.Fragment>
        <Header
          client={selectedClient}
          invoiceNumber={invoiceNumber}
          reference={reference}
          issueDate={issueDate}
          dueDate={dueDate}
          amount={amount}
          amountDue={amountDue}
          amountPaid={amountPaid}
          discount={discount}
          tax={tax}
          invoiceLineItems={selectedOption}
        />
        <Container
          invoiceDetails={invoiceDetails}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          lineItems={lineItems}
          setLineItems={setLineItems}
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
          reference={reference}
          issueDate={issueDate}
          setIssueDate={setIssueDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          amount={amount}
          setAmount={setAmount}
          amountDue={amountDue}
          setAmountDue={setAmountDue}
          amountPaid={amountPaid}
          discount={discount}
          setDiscount={setDiscount}
          tax={tax}
          setTax={setTax}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </React.Fragment>
    );
  }
  return <></>;
};

export default GenerateInvoices;
