import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chat from "../../components/feed/Chat";
import Rightbar from "../../components/rightbar/Rightbar";
import "./liked.css";


export default function ChatPage() {

    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Chat />
                <Rightbar />
            </div>
        </>
    );
}
