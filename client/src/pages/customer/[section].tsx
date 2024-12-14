import RootLayout from "src/layouts/customer/layout";
import { useParams } from "next";

const CustomerSection = () => {
  const [selectedContent, setSelectedContent] = useState<string>('');
  const { section } = useParams();
  return (
    <div>Hello</div>
  );
}

export default CustomerSection;