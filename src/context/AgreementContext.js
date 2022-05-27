import { ethers } from "ethers";
import React, { useState, createContext } from "react";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";
import { AgreementAvaxAddress, AgreementBscAddress, AgreementContractAbi, AgreementMumbaiAddress, AgreementRopestenAddress } from "src/contracts/contract";
import { NotificationContext } from "./Notification";

export const AgreementContext = createContext();

export const AgreementContextProvider = (props) => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);

    const {Moralis,user}= useMoralis();

    const notificationContext = React.useContext(NotificationContext);
    const { sendNotifications } = notificationContext;

    const [labelInfo, setlabelInfo] = useState({
        formData: {
            title: "",
            chain: "mumbai",
            description: "",
            buyerAddress: "",
            sellerAddress: "",
            buyer:"", 
            price: "",
            stakePercentBuyer: "",
            stakePercentSeller: "",
        }
    }); 
 
    const setFormdata = (prop) => (event) => {
        setlabelInfo({ ...labelInfo, formData:{ ...labelInfo.formData, [prop]: event.target.value }});
    };
  
    const steps = [
        { title: "Select Chain" },
        { title: "Escrow Details" }, 
        { title: "Create Agreement" }
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    const createAgreement = async () => {
        let contractAddresss;
        if (labelInfo.formData.chain == "bsc") {
            contractAddresss = AgreementBscAddress;
        } else if (labelInfo.formData.chain == "mumbai") {
            contractAddresss = AgreementMumbaiAddress;
        } else if (labelInfo.formData.chain == "ropsten") {
            contractAddresss = AgreementRopestenAddress;
        }   else if (labelInfo.formData.chain == "avalanche") {
            contractAddresss = AgreementAvaxAddress;
        }

      const   bAddress = labelInfo.formData.buyer == 'buyer' ?  user.attributes.ethAddress : labelInfo.formData.buyerAddress;
      const   sAddress = labelInfo.formData.buyer == 'seller' ?  user.attributes.ethAddress : labelInfo.formData.sellerAddress;
 
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const agreementContract = new ethers.Contract(
            contractAddresss,
            AgreementContractAbi,
            signer
        );

        let txn;

        try {
            const formattedPrice = ethers.utils.parseEther(labelInfo.formData.price.toString());
            txn = await agreementContract.agreementCreate(
                bAddress,
                sAddress,
                formattedPrice,
                labelInfo.formData.stakePercentBuyer.toString(),
                labelInfo.formData.stakePercentSeller.toString(),
                labelInfo.formData.title,
                labelInfo.formData.description
            );
            await txn.wait();

            await sendNotifications({
                to: user.attributes.ethAddress,
                message: `You Create ${labelInfo.formData.title} Agreement Successfully! on ${labelInfo.formData.chain} Network`,
            })
            console.log(txn, "transaction");
            toast.success("success");
            setLoading(false); 
            handleClose();
        } catch (err) {
            setLoading(false);
            console.log(err);
            toast.error("error");
        }
    };

    return (
        <AgreementContext.Provider
            value={{
                page,
                open,
                handleClickOpen,
                handleClose,
                steps, 
                labelInfo,
                setFormdata,
                loading,
                createAgreement 
            }}
        >
            {props.children}
        </AgreementContext.Provider>
    );
};
