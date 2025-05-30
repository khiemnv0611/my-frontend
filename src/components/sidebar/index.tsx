import { useRef } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  FolderOpenOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Logo from "@/assets/images/logo.png";
import { Tooltip, Typography } from "antd";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import PopUpSearch, { PopUpSearchRef } from "./PopUpSearch";
import { SlideDown } from "../animation";
import Chatbot from "@/assets/images/chatbot.jpg";
import SidebarFolderSelector from "./folder/FolderSelector";
import { mockMenu } from "@/mocks";
import { useNavigate } from "react-router-dom";
import ChatSelector from "./chat/ChatSelector";

const { Title } = Typography;

const Sidebar = () => {
  const navigate = useNavigate();
  const popupSearchRef = useRef<PopUpSearchRef>(null);
  const isLargeScreen = useBreakpointMatch("md");

  const { isOpen, toggle } = useSidebar();

  const asideClass = isLargeScreen
    ? isOpen
      ? "block static"
      : "hidden static"
    : `fixed top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`;

  return (
    <SlideDown>
      {!isLargeScreen && (
        <div
          onClick={toggle}
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />
      )}

      <aside
        className={`
          z-50 min-h-full w-64 bg-gray-50 border-r px-4 py-3 flex flex-col gap-4 transition-all duration-300
          ${asideClass}
        `}
      >
        <div className="h-7 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <img src={Logo} alt="logo" className="w-8" />
            <Title level={5} className="uppercase !text-main-red !mb-0">
              Tuyển sinh
            </Title>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="icon-hover"
              onClick={() => popupSearchRef.current?.open()}
            >
              <SearchOutlined style={{ fontSize: 18 }} />
            </div>
            <div className="icon-hover" onClick={toggle}>
              <MenuOutlined style={{ fontSize: 18 }} />
            </div>
          </div>
        </div>

        <Tooltip placement="right" title="Đoạn chat mới">
          <div className="button-hover" onClick={() => navigate("/home")}>
            <div className="text-clip-nowrap">
              <img
                src={Chatbot}
                alt="chatbot"
                className="w-6 h-6 rounded-full border-2 border-main-red"
              />
              ChatGPT pha ke
            </div>
          </div>
        </Tooltip>

        <div className="p-2 flex flex-col gap-2">
          {/* Chat */}
          <ChatSelector />

          {/* Thêm một component hr để chắn ngang giữa chat và folder */}
          <div className="my-2 border-t border-gray-300"></div>

          {/* Folder */}
          <SidebarFolderSelector
            title="Thư mục"
            icon={<FolderOpenOutlined />}
            folders={mockMenu}
          />

          {/* <div className="folder-sidebar-title">Hôm nay</div>
          <div className="folder-sidebar-title">Hôm qua</div>
          <div className="folder-sidebar-title">1 tuần trước</div>
          <div className="folder-sidebar-title">1 tháng trước</div> */}
        </div>
      </aside>

      <PopUpSearch ref={popupSearchRef} />
    </SlideDown>
  );
};

export default Sidebar;
