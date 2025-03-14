import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import { Chatbox } from "@/components/chatbox/chatbox";

export default function Assistant() {
  return (
    <div>
      <Navigation></Navigation>
      <Chatbox />
      <Footer></Footer>
    </div>
  );
}
