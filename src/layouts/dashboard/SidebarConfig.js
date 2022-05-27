// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Escrow Agreements",
    path: "/dashboard/agreement",
    icon: getIcon("icon-park-outline:agreement"),
  },
  {
    title: "Crypto Payment",
    path: "/dashboard/send-request",
    icon: getIcon("fluent:wallet-credit-card-24-filled"),
  }, 
  {
    title: "product & Services",
    path: "/dashboard/products",
    icon: getIcon("eva:shopping-bag-fill"),
  }, 
  {
    title: "Invoice",
    path: "/dashboard/invoice",
    icon: getIcon("uil:invoice"),
  },
  {
    title: "Messages",
    path: "/dashboard/chat",
    icon: getIcon("ph:chat-text-fill"),
  }, 
  {
    title: "Analytics",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Product Integration",
    path: "/dashboard/product-integration",
    icon: getIcon("eva:shopping-bag-fill"),
  },  
]; 

export default sidebarConfig;
